import * as schemas from "../lib/onvif_schemas";
import onvifCMD from './onvifCMD';

/**
 * Get key value from option object. (eg: { 'Manual': 0, 'NTP': 1 })
 * 
 * @param {any} obj 
 * @returns string
 */
function getValue( obj ) {
    if ( obj && obj.v !== undefined )
        return Object.keys( obj )[obj.v + 1];
    else
        return false;
}

export async function GetProfiles() {
    try {
        let res = await onvifCMD( 'media', 'GetProfiles' );
        console.log(res);
        //let profiles = res.profiles;
        let datas = [];
/*
        profiles.forEach((profile, index) => {
            let p = {
                key: index,
                user_name: user.Username.v,
                user_level: getValue( user.UserLevel )
            }

            datas.push(u);
        });
*/
        return datas;

    } catch(e) {
        console.log("[GetProfiles] ", e);
    }
}