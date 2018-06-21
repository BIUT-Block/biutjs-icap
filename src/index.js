const hex = require('convert-hex')
/**
 * For simplicity we redefine it, as the default uses lowercase
 */
const BASE36_ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const bs36 = require('base-x')(BASE36_ALPHABET)
const secIcap = {}

secIcap.encodeBBAN = function (bban) {
  if (typeof bban === 'object') {
    if (bban.asset.length !== 3 ||
        bban.institution.length !== 4 ||
        bban.client.length !== 9) {
      throw new Error('Invalid \'indirect\' SEC BBAN')
    }
    return [ bban.asset, bban.institution, bban.client ].join('').toUpperCase()
  } else if ((bban.length === 42) && (bban[0] === '0') && (bban[1] === 'x')) {
    /**
     * Workaround for base-x, see https://github.com/cryptocoinjs/base-x/issues/18
     */
    if ((bban[2] === '0') && (bban[3] === '0')) {
      bban = '0x' + bban.slice(4)
    }

    return bs36.encode(hex.hexToBytes(bban))
  } else {
    throw new Error('Not a valid input for SEC BBAN')
  }
}

secIcap.decodeBBAN = function (bban) {
  var length = bban.length
  if (length === 30 || length === 31) {
    var tmp = hex.bytesToHex(bs36.decode(bban))

    /**
     * FIXME: horrible padding code
     */
    while (tmp.length < 40) {
      tmp = '0' + tmp
    }

    /**
     * NOTE: certain tools include an extra leading 0, drop that
     */
    if ((tmp.length === 42) && (tmp[0] === '0') && (tmp[1] === '0')) {
      tmp = tmp.slice(2)
    }

    return '0x' + tmp
  } else if (length === 16) {
    return {
      asset: bban.slice(0, 3),
      institution: bban.slice(3, 7),
      client: bban.slice(7, 16)
    }
  } else {
    throw new Error('Not a valid SEC BBAN')
  }
}

/**
 * ISO13616 reordering and letter translation
 * NOTE: we assume input is uppercase only
 * based off code from iban.js
 * @param {string} iban 
 */

function prepare (iban) {
  /**
   * move front to the back
   */
  iban = iban.slice(4) + iban.slice(0, 4)

  /**
   * translate letters to numbers
   */
  return iban.split('').map(function (n) {
    var code = n.charCodeAt(0)
    /**
     * 65 == A, 90 == Z in ASCII
     */
    if (code >= 65 && code <= 90) {
      /**
       * A = 10, B = 11, ... Z = 35
       */
      return code - 65 + 10
    } else {
      return n
    }
  }).join('')
}

/**
 * Calculate ISO7064 mod 97-10
 * NOTE: assumes all numeric input string
 * @param {any} input 
 */
function mod9710 (input) {
  var m = 0
  for (var i = 0; i < input.length; i++) {
    m *= 10
    m += input.charCodeAt(i) - 48 
    m %= 97
  }
  return m
}

/**
 * @param  {string} bban
 * @param  {any} print
 */
secIcap.encode = function (bban, print) {
  bban = secIcap.encodeBBAN(bban)

  var checksum = 98 - mod9710(prepare('MO00' + bban))

  /**
   * format into 2 digits
   */
  checksum = ('0' + checksum).slice(-2)

  var iban = 'MO' + checksum + bban
  if (print === true) {
    /**
     * split a group of 4 chars with spaces
     */
    iban = iban.replace(/(.{4})/g, '$1 ')
  }

  return iban
}
/**
 * decode IBAN to Address
 * @param  {string} iban
 * @param  {any} novalidity
 */
secIcap.decode = function (iban, novalidity) {
  /**
   * change from 'print format' to 'electronic format', e.g. remove spaces
   */
  iban = iban.replace(/\ /g, '')

  /**
   * check for validity
   */
  if (!novalidity) {
    if (iban.slice(0, 2) !== 'MO') {
      throw new Error('Not in SEC secIcap format')
    }

    if (mod9710(prepare(iban)) !== 1) {
      throw new Error('Invalid checksum in IBAN')
    }
  }

  return secIcap.decodeBBAN(iban.slice(4, 35))
}


/**
 * Convert Ethereum address to secIcap
 * @method fromAddress
 * @param  {string} address Address as a hex string
 * @param  {bool} nonstd Accept address which will result in non-standard IBAN
 * @returns {string}
 */
secIcap.fromAddress = function (address, print, nonstd) {
  var ret = secIcap.encode(address, print)

  if ((ret.replace(' ', '').length !== 34) && (nonstd !== true)) {
    throw new Error('Supplied address will result in invalid an IBAN')
  }

  return ret
}

/**
 * Convert asset into secIcap
 * @method fromAsset
 * @param  {Object} asset Asset object, must contain the fields asset, institution and client
 * @param  {string} print
 * @returns {string}
 */
secIcap.fromAsset = function (asset, print) {
  return secIcap.encode(asset, print)
}

/**
 * @method toAddress
 * @param {string} iban IBAN/secIcap, must have an address encoded
 * @returns {string}
 */
secIcap.toAddress = function (iban) {
  var address = secIcap.decode(iban)
  if (typeof address !== 'string') {
    throw new Error('Not an address-encoded secIcap')
  }
  return address
}

/**
 * Convert an secIcap into an asset
 * @method toAsset
 * @param {string} iban 
 * @returns {object}
 */
secIcap.toAsset = function (iban) {
  var asset = secIcap.decode(iban)
  if (typeof asset !== 'object') {
    throw new Error('Not an asset-encoded secIcap')
  }
  return asset
}

secIcap.issecIcap = function (iban) {
  try {
    secIcap.decode(iban)
    return true
  } catch (e) {
    return false
  }
}

secIcap.isAddress = function (iban) {
  try {
    secIcap.toAddress(iban)
    return true
  } catch (e) {
    return false
  }
}

secIcap.isAsset = function (iban) {
  try {
    secIcap.toAsset(iban)
    return true
  } catch (e) {
    return false
  }
}

module.exports = secIcap
