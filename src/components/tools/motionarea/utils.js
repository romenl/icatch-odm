export function hex2bin(hex){
    let result = '';
    formatHex(hex).split(' ').forEach((h) => {
        result += ("00000000" + parseInt(h, 16).toString(2)).substr(-8);
    });
    return result;
}
export function bin2hex(bin){
    let result = '';
    formatBin(bin).split(' ').forEach((b) => {
        result += ("00" + parseInt(b, 2).toString(16)).substr(-2).toUpperCase();
    });
    return result;
}
export function formatHex(hex){
    let result = '';
    for(let i = 0; i < hex.length; i++){
        if ( i !== 0 && i%2 === 0 )
            result += ' ';
        
        result += hex[i];
    }
    return result;
}
export function formatBin(bin){
    let result = '';
    for(let i = 0; i < bin.length; i++){
        if ( i !== 0 && i%8 === 0 )
            result += ' ';
        
        result += bin[i];
    }
    return result;
}
export function fillin(source){
    let fill = source.length % 8;
    for( let i = 0; i < fill; i++ ){
        source += '0';
    }    
    return source;
}
export function hexToBase64(str) {
    return btoa(String.fromCharCode.apply(null,
      str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "))
    );
}  
export function base64ToHex(str) {
    let hex = [];
    for (let i = 0, bin = atob(str.replace(/[ \r\n]+$/, "")); i < bin.length; ++i) {
        let tmp = bin.charCodeAt(i).toString(16);
        if (tmp.length === 1) tmp = "0" + tmp;
        hex[hex.length] = tmp;
    }
    return hex.join(" ");
}