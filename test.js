const ICAP = require('./index')

let iban = ICAP.fromAsset({
  asset: 'SEC',
  institution: 'XREG',
  client: 'GAVOFYORK'
})
// returns 'XE81ETHXREGGAVOFYORK'
console.log(`IBAN: ${iban} Length: ${iban.length}`)
console.log('*******************************************************************************')

let asset = ICAP.toAsset('MO73SECXREGGAVOFYORK')
// returns {
//   asset: 'SEC',
//   institution: 'XREG',
//   client: 'GAVOFYORK'
// }
console.log(asset)
console.log('*******************************************************************************')
console.log('###############################################################################')


let ret = ICAP.fromAddress('0x00c5496aee77c1ba1f0854206a26dda82a81d6d8')
// returns 'MO4538O073KYGTWWZN0F2WZ0R8PX5ZPPZS'
console.log(`address IBAN: ${ret} Length: ${ret.length}`)
console.log('*******************************************************************************')

let address = ICAP.toAddress('MO4538O073KYGTWWZN0F2WZ0R8PX5ZPPZS')
// returns '0x00c5496aee77c1ba1f0854206a26dda82a81d6d8'
console.log(`Address: ${address} Length: ${address.length}`)
console.log('*******************************************')
