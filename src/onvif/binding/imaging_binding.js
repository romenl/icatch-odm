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

export async function GetImagingSettings() {
    try {
        let res = await onvifCMD( 'imaging', 'GetImagingSettings', 0 );
        let settings = res.ImagingSettings;
        
        return {
            BacklightCompensation: {
                mode: getValue(settings.BacklightCompensation.Mode),
                level: settings.BacklightCompensation.Level.v
            },
            Brightness: settings.Brightness.v,
            ColorSaturation: settings.ColorSaturation.v,
            Contrast: settings.Contrast.v,
            Exposure: settings.Exposure.ExposureTime.v,
            IrCutFilter: getValue(settings.IrCutFilter),
            Sharpness: settings.Sharpness.v,
            WideDynamicRange: {
                mode: getValue(settings.WideDynamicRange.mode),
                level: settings.WideDynamicRange.Level.v
            }
        };

    } catch(e) {
        console.log("[GetImagingSettings] ", e);
    }
}