import packbits from './packbits';
import { hex2bin, base64ToHex } from './utils';

function packBitsDecode( source ){
    return hex2bin( packbits.decode( source ) );
}
function decode( source ){
    return packBitsDecode( base64ToHex( source ) );
}

export default decode;