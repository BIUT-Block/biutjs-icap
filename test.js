const ICAP = require('./index')

let iban = ICAP.fromAsset({
  asset: 'ETH',
  institution: 'XREG',
  client: 'GAVOFYORK'
})
// returns 'XE81ETHXREGGAVOFYORK'
//console.log(`IBAN: ${iban} Length: ${iban.length}`)
//console.log('*******************************************************************************')

let ret = ICAP.fromAddress('0x00c5496aee77c1ba1f0854206a26dda82a81d6d8')
// returns 'XE7338O073KYGTWWZN0F2WZ0R8PX5ZPPZS'
console.log(`address IBAN: ${ret} Length: ${ret.length}`)
console.log('*******************************************************************************')

let asset = ICAP.toAsset('XE81ETHXREGGAVOFYORK')
// returns {
//   asset: 'ETH',
//   institution: 'XREG',
//   client: 'GAVOFYORK'
// }
//console.log(asset)
//console.log('*******************************************************************************')

let address = ICAP.toAddress('XE7338O073KYGTWWZN0F2WZ0R8PX5ZPPZS')
// returns '0x00c5496aee77c1ba1f0854206a26dda82a81d6d8'
console.log(`Address: ${address} Length: ${address.length}`)
console.log('*******************************************')
