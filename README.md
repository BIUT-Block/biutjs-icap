## SEC ICAP

<dl>
<dt><a href="#BASE36_ALPHABET">BASE36_ALPHABET</a></dt>
<dd><p>For simplicity we redefine it, as the default uses lowercase</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#prepare">prepare(iban)</a></dt>
<dd><p>ISO13616 reordering and letter translation
NOTE: we assume input is uppercase only
based off code from iban.js</p>
</dd>
<dt><a href="#mod9710">mod9710(input)</a></dt>
<dd><p>Calculate ISO7064 mod 97-10
NOTE: assumes all numeric input string</p>
</dd>
<dt><a href="#fromAddress">fromAddress(address, nonstd)</a> ⇒ <code>string</code></dt>
<dd><p>Convert Ethereum address to ICAP</p>
</dd>
<dt><a href="#fromAsset">fromAsset(asset, print)</a> ⇒ <code>string</code></dt>
<dd><p>Convert asset into ICAP</p>
</dd>
<dt><a href="#toAddress">toAddress(iban)</a> ⇒ <code>string</code></dt>
<dd></dd>
<dt><a href="#toAsset">toAsset(iban)</a> ⇒ <code>object</code></dt>
<dd><p>Convert an ICAP into an asset</p>
</dd>
</dl>

<a name="BASE36_ALPHABET"></a>

## BASE36_ALPHABET
For simplicity we redefine it, as the default uses lowercase

**Kind**: global constant  
<a name="prepare"></a>

## prepare(iban)
ISO13616 reordering and letter translation
NOTE: we assume input is uppercase only
based off code from iban.js

**Kind**: global function  

| Param | Type |
| --- | --- |
| iban | <code>string</code> | 

<a name="prepare..iban"></a>

### prepare~iban
move front to the back

**Kind**: inner property of [<code>prepare</code>](#prepare)  
<a name="mod9710"></a>

## mod9710(input)
Calculate ISO7064 mod 97-10
NOTE: assumes all numeric input string

**Kind**: global function  

| Param | Type |
| --- | --- |
| input | <code>any</code> | 

<a name="fromAddress"></a>

## fromAddress(address, nonstd) ⇒ <code>string</code>
Convert Ethereum address to ICAP

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | Address as a hex string |
| nonstd | <code>bool</code> | Accept address which will result in non-standard IBAN |

<a name="fromAsset"></a>

## fromAsset(asset, print) ⇒ <code>string</code>
Convert asset into ICAP

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| asset | <code>Object</code> | Asset object, must contain the fields asset, institution and client |
| print | <code>string</code> |  |

<a name="toAddress"></a>

## toAddress(iban) ⇒ <code>string</code>
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| iban | <code>string</code> | IBAN/ICAP, must have an address encoded |

<a name="toAsset"></a>

## toAsset(iban) ⇒ <code>object</code>
Convert an ICAP into an asset

**Kind**: global function  

| Param | Type |
| --- | --- |
| iban | <code>string</code> | 


