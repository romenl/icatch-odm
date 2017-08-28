export function curryCMD( name, fn ){
    return function(){
        try {
            return fn(arguments);
        } catch(e) {
            console.log(`[${name}] `, e);
        }
    }
}

/**
 * Get key value from option object. (eg: { 'Manual': 0, 'NTP': 1 })
 * 
 * @param {any} obj 
 * @returns string
 */
export function getKey( obj ) {
    if ( obj && obj.v !== undefined ){
        let keys = Object.keys(obj);
        let target = keys.findIndex(key => obj[key] === obj.v && key !== 'v');
        return keys[target];
    }
    else
        return false;
}