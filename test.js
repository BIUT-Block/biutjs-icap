const ICAP = require('./ethreumjs-test')

ICAP.fromAsset({
  asset: 'ETH',
  institution: 'XREG',
  client: 'GAVOFYORK'
})
// returns 'XE81ETHXREGGAVOFYORK'

ICAP.fromAddress('0x00c5496aee77c1ba1f0854206a26dda82a81d6d8')
// returns 'XE7338O073KYGTWWZN0F2WZ0R8PX5ZPPZS'

ICAP.toAsset('XE81ETHXREGGAVOFYORK')
// returns {
//   asset: 'ETH',
//   institution: 'XREG',
//   client: 'GAVOFYORK'
// }

ICAP.toAddress('XE7338O073KYGTWWZN0F2WZ0R8PX5ZPPZS')
// returns '0x00c5496aee77c1ba1f0854206a26dda82a81d6d8'
