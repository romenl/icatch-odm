import * as schemas from "../lib/onvif_schemas";
import { curryCMD, getKey } from './utils';
import onvifCMD from './onvifCMD';

export const GetVideoEncoderConfiguration = 
curryCMD( 'GetVideoEncoderConfiguration', async (arg) => {
    let token = arg[0];
    let res = await onvifCMD( 'media', 'GetVideoEncoderConfiguration', token );
    let configuration = res.Configuration;
    
    return {
        data: configuration,
        Encoding: configuration.Encoding.v,
        Resolution: `${configuration.Resolution.Width.v}x${configuration.Resolution.Height.v}`,
        FPS: configuration.RateControl.FrameRateLimit.v,
        Bitrate: configuration.RateControl.BitrateLimit.v
    };
});

export const GetVideoEncoderConfigurationOptions =
curryCMD( 'GetVideoEncoderConfigurationOptions', async (arg) => {
   let token = arg[0];
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
       Resolution: resoltionOptions,
       FrameRateRange: {
           Min: options.H264.FrameRateRange.Min.v,
           Max: options.H264.FrameRateRange.Max.v
       },
       BitrateRange: {
           Min: options.Extension.H264.BitrateRange.Min.v,
           Max: options.Extension.H264.BitrateRange.Max.v
       }
   };
});

export const SetVideoEncoderConfiguration = 
curryCMD( 'SetVideoEncoderConfiguration', async (arg) => {
    let settings = arg[0];
    let mainConfiguration = new schemas.trt_SetVideoEncoderConfiguration(),
        subConfiguration  = new schemas.trt_SetVideoEncoderConfiguration();

    mainConfiguration.Configuration = settings.mainSettings;
    subConfiguration.Configuration = settings.subSettings;

    await Promise.all([
        onvifCMD( 'media', 'SetVideoEncoderConfiguration', mainConfiguration ),
        onvifCMD( 'media', 'SetVideoEncoderConfiguration', subConfiguration )
    ]);
});