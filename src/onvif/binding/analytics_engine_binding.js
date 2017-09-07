//import * as schemas from "../lib/onvif_schemas";
import { curryCMD } from './utils';
import onvifCMD from './onvifCMD';

export const GetAnalyticsModules = 
curryCMD( 'GetAnalyticsModules', async () => {
    let token = 'CellMotion';
    let res = await onvifCMD( 'analytics', 'GetAnalyticsModules', token );
    
    // deal response
    console.log(res);
    
    return {
    };
});
