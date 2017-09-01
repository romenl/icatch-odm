import packbits from 'packbits';

function hex2bin(hex){
    let result = '';
    formatHex(hex).split(' ').forEach((h) => {
        result += ("00000000" + parseInt(h, 16).toString(2)).substr(-8);
    });
    return result;
}
function bin2hex(bin){
    let result = '';
    formatBin(bin).split(' ').forEach((b) => {
        result += ("00" + parseInt(b, 2).toString(16)).substr(-2).toUpperCase();
    });
    return result;
}
function formatHex(hex){
    let result = '';
    for(let i = 0; i < hex.length; i++){
        if ( i !== 0 && i%2 === 0 )
            result += ' ';
        
        result += hex[i];
    }
    return result;
}
function formatBin(bin){
    let result = '';
    for(let i = 0; i < bin.length; i++){
        if ( i !== 0 && i%8 === 0 )
            result += ' ';
        
        result += bin[i];
    }
    return result;
}

export function packBitsEncode( source ){
    source = bin2hex(source);
    source = formatHex(source);
    return packbits.encode(source);
}
export function packBitsDecode( source ){        
    source = formatHex(source);
    source = packbits.decode(source);
    return hex2bin(source);
}