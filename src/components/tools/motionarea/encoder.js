import packbits from './packbits';
import { formatHex, bin2hex, fillin, hexToBase64 } from './utils';

function packBitsEncode( source ){
    return packbits.encode( formatHex( bin2hex( fillin(source) ) ) );
}

function encode( source ){
    return hexToBase64( packBitsEncode( source ) );
}

export default encode;