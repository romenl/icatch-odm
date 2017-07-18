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

export async function GetVideoEncoderConfiguration( token ) {
    try {
        let res = await onvifCMD( 'media', 'GetVideoEncoderConfiguration', token );
        let configuration = res.Configuration;

        return {
            data: configuration,
            resolution: `${configuration.Resolution.Width.v}x${configuration.Resolution.Height.v}`,
            fps: configuration.RateControl.FrameRateLimit.v,
            quality: configuration.Quality.v
        };

    } catch(e) {
        console.log("[GetVideoEncoderConfiguration] ", e);
    }
}

export async function GetVideoEncoderConfigurationOptions( token ) {
    try {
        let res = await onvifCMD( 'media', 'GetVideoEncoderConfigurationOptions', token );
        let options = res.Options;

        let resolutionAvailable = options.H264.ResolutionsAvailable.v,
            resoltionOptions = [];

        resolutionAvailable.forEach((r, index) => {
            resoltionOptions.push({
                value: index,
                name: `${r.Width.v}x${r.Height.v}`
            });
        });
        
        return {
            h264: {
                resolution: resoltionOptions,
                fps: {
                    min: options.H264.FrameRateRange.Min.v,
                    max: options.H264.FrameRateRange.Max.v
                }
            },
            quality: {
                min: options.QualityRange.Min.v,
                max: options.QualityRange.Max.v
            }
        };
        
    } catch(e) {
        console.log("[GetVideoEncoderConfiguration] ", e);
    }
}

export async function SetVideoEncoderConfiguration( settings, nextSettings ) {
    try {
        let mainConfiguration = new schemas.trt_SetVideoEncoderConfiguration(),
            subConfiguration  = new schemas.trt_SetVideoEncoderConfiguration();

        let mainSettings = settings.main.setting.data,
            subSettings  = settings.sub.setting.data;
        
        // Main Stream
        mainSettings.Resolution.Width.v = nextSettings.main_resolution.split('x')[0];
        mainSettings.Resolution.Width.v = nextSettings.main_resolution.split('x')[1];
        mainSettings.RateControl.FrameRateLimit.v = nextSettings.main_fps;
        mainSettings.Quality.v = nextSettings.main_quality;
        
        // Sub Stream
        subSettings.Resolution.Width.v = nextSettings.sub_resolution.split('x')[0];
        subSettings.Resolution.Width.v = nextSettings.sub_resolution.split('x')[1];
        subSettings.RateControl.FrameRateLimit.v = nextSettings.sub_fps;
        subSettings.Quality.v = nextSettings.sub_quality;

        mainConfiguration.Configuration = mainSettings;
        subConfiguration.Configuration = subSettings;

        await Promise.all([
            onvifCMD( 'media', 'SetVideoEncoderConfiguration', mainConfiguration ),
            onvifCMD( 'media', 'SetVideoEncoderConfiguration', subConfiguration )
        ]);
    } catch(e) {
        console.log("[SetVideoEncoderConfiguration] ", e);
    }
}