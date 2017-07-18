import * as schemas from "../lib/onvif_schemas";
import onvifCMD from './onvifCMD';

/**
 * Get key value from option object. (eg: { 'Manual': 0, 'NTP': 1 })
 * 
 * @param {any} obj 
 * @returns string
 */
function getKey( obj ) {
    if ( obj && obj.v !== undefined ){
        let keys = Object.keys(obj);
        let target = keys.findIndex(key => obj[key] === obj.v && key !== 'v');
        return keys[target];
    }
    else
        return false;
}

export async function GetImagingSettings( token ) {
    try {
        let res = await onvifCMD( 'imaging', 'GetImagingSettings', token );
        let settings = res.ImagingSettings;
        
        return {
            data: settings,
            BacklightCompensation: {
                mode: getKey(settings.BacklightCompensation.Mode),
                level: settings.BacklightCompensation.Level.v
            },
            Brightness: settings.Brightness.v,
            ColorSaturation: settings.ColorSaturation.v,
            Contrast: settings.Contrast.v,
            Exposure: settings.Exposure.ExposureTime.v,
            IrCutFilter: getKey(settings.IrCutFilter),
            Sharpness: settings.Sharpness.v,
            WideDynamicRange: {
                mode: getKey(settings.WideDynamicRange.Mode),
                level: settings.WideDynamicRange.Level.v
            }
        };
    } catch(e) {
        console.log("[GetImagingSettings] ", e);
    }
}

export async function SetImagingSettings( settings, nextSettings ) {
    try {
        let setImagingSettings = new schemas.timg_SetImagingSettings();
        setImagingSettings.VideoSourceToken.v = '0';
        
        settings.BacklightCompensation.Mode.v = nextSettings.backlight_compensation === 0 ? 0 : 1;
        settings.BacklightCompensation.Level.v = nextSettings.backlight_compensation;
        settings.Brightness.v = nextSettings.brightness;
        settings.ColorSaturation.v = nextSettings.color_saturation;
        settings.Contrast.v = nextSettings.contrast;
        settings.Exposure.ExposureTime.v = nextSettings.exposure;
        settings.IrCutFilter.v = settings.IrCutFilter[ nextSettings.ircut_filter ];
        settings.Sharpness.v = nextSettings.sharpness;
        settings.WideDynamicRange.Mode.v = !nextSettings.wide_dynamic_range.enable ? 0 : 1;
        settings.WideDynamicRange.Level.v = nextSettings.wide_dynamic_range.content ;
        
        setImagingSettings.ImagingSettings = settings;        
        await onvifCMD( 'imaging', 'SetImagingSettings', setImagingSettings );
    } catch(e) {
        console.log("[SetImagingSettings] ", e);
    }
}