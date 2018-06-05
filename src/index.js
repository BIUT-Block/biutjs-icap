'strict mode'
const hex = require('convert-hex')

// For simplicity we redefine it, as the default uses lowercase
const BASE36_ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const bs36 = require('base-x')(BASE36_ALPHABET)

const ICAP = {}