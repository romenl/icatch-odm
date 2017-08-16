import * as schemas from "../lib/onvif_schemas";
import onvifCMD from './onvifCMD';

export async function GetVideoEncoderConfiguration( token ) {
    try {
        let res = await onvifCMD( 'media', 'GetVideoEncoderConfiguration', token );
        let configuration = res.Configuration;
        
        return {
            data: configuration,
            Resolution: `${configuration.Resolution.Width.v}x${configuration.Resolution.Height.v}`,
            FPS: configuration.RateControl.FrameRateLimit.v,
            Bitrate: configuration.RateControl.BitrateLimit.v
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
            H264: {
                Resolution: resoltionOptions,
                FrameRateRange: {
                    Min: options.H264.FrameRateRange.Min.v,
                    Max: options.H264.FrameRateRange.Max.v
                }
            },
            BitrateRange: {
                Min: options.Extension.H264.BitrateRange.Min.v,
                Max: options.Extension.H264.BitrateRange.Max.v
            }
        };
        
    } catch(e) {
        console.log("[GetVideoEncoderConfiguration] ", e);
    }
}

/**
 * settings: { mainSettings, subSettings }
 * 
 * @export
 * @param {mainSettings, subSettings} settings
 */
export async function SetVideoEncoderConfiguration( settings ) {
    try {
        let mainConfiguration = new schemas.trt_SetVideoEncoderConfiguration(),
            subConfiguration  = new schemas.trt_SetVideoEncoderConfiguration();
        
        mainConfiguration.Configuration = settings.mainSettings;
        subConfiguration.Configuration = settings.subSettings;

        await Promise.all([
            onvifCMD( 'media', 'SetVideoEncoderConfiguration', mainConfiguration ),
            onvifCMD( 'media', 'SetVideoEncoderConfiguration', subConfiguration )
        ]);
    } catch(e) {
        console.log("[SetVideoEncoderConfiguration] ", e);
    }
}