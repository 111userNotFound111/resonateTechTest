// encoder class for unique encoding

// input: storeId, transactionId
// constraints : 
// 1. max 9 characters
// 2. user friendly 
// 3. secure 
// 4. string
// output: promotion code string

// for functionality, clarity and maintenance 
const encodeList = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const encodeListLength = encodeList.length
const millisecondToDay = 1000 * 60 * 60 *24
// base62 conversion 
function base62Encode(num) {
    let encoded = ''
    while (num > 0) {
        encoded = encodeList[num % encodeListLength] + encoded
        num = Math.floor(num / encodeListLength)
    }
    return encoded
}

function base62Decode(encoded){
    let decoded = 0
    for (let i = 0; i < encoded.length; i++) {
        decoded = decoded * encodeListLength + encodeList.indexOf(encoded[i])
    }
    return decoded
}

// date compression
function dateConvert(dateInput){
    const date = Math.floor(dateInput / millisecondToDay)
    return date
}

// data decompress 
function dateDeconvert(dateInput){
    const date = dateInput * millisecondToDay
    return date
}

// code slices
function codeSlicer(codeInput,start, end){
    const codeSliced = codeInput.slice(start, end)
    return codeSliced
}

// code generations 
function generateShortCode(storeId, transactionId) {
    // initialisations
    const date = new Date()
    // storeId conversion 1-200
    const storeIdInt = parseInt(storeId)
    let storeIdEncoded = base62Encode(storeIdInt).padStart(2,'0')
    // transaction encoding upto 1-10000
    const transIdInt = parseInt(transactionId)
    let transIdEncoded = base62Encode(transIdInt).padStart(3,'0')
    // date conversion
    const dateInt = date.getTime()
    const dateConverted = dateConvert(dateInt)
    // console.log("date converted", dateConverted)
    let dateEncoded = base62Encode(dateConverted)
    // console.log("date encoded digits", dateEncoded)
    // combined string
    let combineCode = storeIdEncoded + transIdEncoded  + dateEncoded
    combineCode = combineCode.padStart(8,'0')
    // console.log("combined string",combineCode)
    return combineCode
}

// TODO: Modify this function
function decodeShortCode(shortCode) {
    const storeIdEncoded = codeSlicer(shortCode, 0, 2)
    const transIdEncoded = codeSlicer(shortCode, 2, 5)
    const dateEncoded = codeSlicer(shortCode, 5, 9)
    
    // decode 
    const storeId = base62Decode(storeIdEncoded)
    const transactionId = base62Decode(transIdEncoded)
    const dateDecoded = base62Decode(dateEncoded)
    const dateDay = dateDeconvert(dateDecoded)
    const shopDate = new Date(dateDay)
    return {
        storeId, 
        shopDate, 
        transactionId, 
    }
}

