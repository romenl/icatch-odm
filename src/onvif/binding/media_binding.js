import * as schemas from "../lib/onvif_schemas";
import { curryCMD, getKey } from './utils';
import onvifCMD from './onvifCMD';

export const GetVideoEncoderConfigurations = 
curryCMD( 'GetVideoEncoderConfigurations', async (arg) => {
    let token = arg[0];
    let res = await onvifCMD( 'media2', 'GetVideoEncoderConfigurations', token );
    let configuration = res.Configurations.v[0];
    
    return {
        data: configuration,
        Encoding: configuration.Encoding.v,
        Resolution: `${configuration.Resolution.Width.v}x${configuration.Resolution.Height.v}`,
        FPS: configuration.RateControl.FrameRateLimit.v,
        Bitrate: configuration.RateControl.BitrateLimit.v
    };
});

/**** H264 ****/
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
    let res = await onvifCMD( 'media2', 'GetVideoEncoderConfigurationOptions', token );
    let options = res.Options;
    let result = [];

    options.v.forEach((option) => {
        let resolutionAvailable = option.ResolutionsAvailable.v,
        resoltionOptions = [];

        resolutionAvailable.forEach((r, index) => {
            resoltionOptions.push({
                value: index,
                name: `${r.Width.v}x${r.Height.v}`
            });
        });
        
        result.push({
            Encoding: option.Encoding.v,
            Resolution: resoltionOptions,
            FrameRateRange: {
                Min: 1,
                Max: 30//option.FrameRatesSupported.v[0].v
            },
            BitrateRange: {
                Min: option.BitrateRange.Min.v,
                Max: option.BitrateRange.Max.v
            }
        });
    });
    
    return result;
});

/**** H264 ****/
// export const GetVideoEncoderConfigurationOptions =
// curryCMD( 'GetVideoEncoderConfigurationOptions', async (arg) => {
//    let token = arg[0];
//    let res = await onvifCMD( 'media', 'GetVideoEncoderConfigurationOptions', token );
//    let options = res.Options;
   
//    let resolutionAvailable = options.H264.ResolutionsAvailable.v,
//        resoltionOptions = [];

//    resolutionAvailable.forEach((r, index) => {
//        resoltionOptions.push({
//            value: index,
//            name: `${r.Width.v}x${r.Height.v}`
//        });
//    });
   
//    return {            
//        Resolution: resoltionOptions,
//        FrameRateRange: {
//            Min: options.H264.FrameRateRange.Min.v,
//            Max: options.H264.FrameRateRange.Max.v
//        },
//        BitrateRange: {
//            Min: options.Extension.H264.BitrateRange.Min.v,
//            Max: options.Extension.H264.BitrateRange.Max.v
//        }
//    };
// });

export const SetVideoEncoderConfiguration = 
curryCMD( 'SetVideoEncoderConfiguration', async (arg) => {
    let settings = arg[0];
    let mainConfiguration = new schemas.tr2_SetVideoEncoderConfiguration(),
        subConfiguration  = new schemas.tr2_SetVideoEncoderConfiguration();

    mainConfiguration.Configuration = settings.mainSettings;
    subConfiguration.Configuration = settings.subSettings;

    await Promise.all([
        onvifCMD( 'media2', 'SetVideoEncoderConfiguration', mainConfiguration ),
        onvifCMD( 'media2', 'SetVideoEncoderConfiguration', subConfiguration )
    ]);
});

/**** H264 ****/
// export const SetVideoEncoderConfiguration = 
// curryCMD( 'SetVideoEncoderConfiguration', async (arg) => {
//     let settings = arg[0];
//     let mainConfiguration = new schemas.trt_SetVideoEncoderConfiguration(),
//         subConfiguration  = new schemas.trt_SetVideoEncoderConfiguration();

//     mainConfiguration.Configuration = settings.mainSettings;
//     subConfiguration.Configuration = settings.subSettings;

//     await Promise.all([
//         onvifCMD( 'media', 'SetVideoEncoderConfiguration', mainConfiguration ),
//         onvifCMD( 'media', 'SetVideoEncoderConfiguration', subConfiguration )
//     ]);
// });

export const GetOSDOptions = 
curryCMD( 'GetOSDOptions', async (arg) => {
    let token = arg[0];
    let res = await onvifCMD( 'media2', 'GetOSDOptions', token );
    let options = res.OSDOptions;

    const typeOptions = [{
        value: '0',
        name: 'Text'
    },{
        value: '1',
        name: 'Image'
    },{
        value: '2',
        name: 'Extended'
    }];

    let textType = options.TextOption.Type.v,
        textTypeOptions = [];
    textType.forEach((t, index) => {
        textTypeOptions.push({
            value: index,
            name: `${t.v}`
        });
    });

    let position = options.PositionOption.v,
        positionOptions = [];
    position.forEach((p, index) => {
        positionOptions.push({
            value: index,
            name: `${p.v}`
        });
    });

    let dateFormat = options.TextOption.DateFormat.v,
        dateFormatOptions = [];
    dateFormat.forEach((d, index) => {
        dateFormatOptions.push({
            value: index,
            name: `${d.v}`
        });
    });

    let timeFormat = options.TextOption.TimeFormat.v,
        timeFormatOptions = [];
    timeFormat.forEach((t, index) => {
        timeFormatOptions.push({
            value: index,
            name: `${t.v}`
        });
    });

    return {
        Type: typeOptions,
        PositionOption: positionOptions,
        TextOption: {
            Type: textTypeOptions,
            FontSizeRange: {
                Min: options.TextOption.FontSizeRange.Min.v,
                Max: options.TextOption.FontSizeRange.Max.v
            },
            DateFormat: dateFormatOptions,
            TimeFormat: timeFormatOptions
        }
    };
});

export const GetOSDs = 
curryCMD( 'GetOSDs', async (arg) => {
    let token = arg[0];
    let res = await onvifCMD( 'media2', 'GetOSDs', token );
    let osds = res.OSDs.v;
    let datas = [];

    osds.forEach(o => {
        datas.push({
            data: o,
            Token: o.token.v,
            Type: getKey( o.Type ),
            Position: {
                Type: o.Position.Type.v,
                Pos: {
                    x: o.Position.Pos.x.v,
                    y: o.Position.Pos.y.v
                }
            },
            TextString: {
                Type: o.TextString.Type.v,
                DateFormat: o.TextString.DateFormat.v,
                TimeFormat: o.TextString.TimeFormat.v,
                FontSize: o.TextString.FontSize.v,
                FontColor: {
                    Color: {
                        X: o.TextString.FontColor.Color.X.v,
                        Y: o.TextString.FontColor.Color.Y.v,
                        Z: o.TextString.FontColor.Color.Z.v
                    },
                    Transparent: o.TextString.FontColor.Transparent.v / 255
                },
                BackgroundColor: {
                    Color: {
                        X: o.TextString.BackgroundColor.Color.X.v,
                        Y: o.TextString.BackgroundColor.Color.Y.v,
                        Z: o.TextString.BackgroundColor.Color.Z.v
                    },
                    Transparent: o.TextString.BackgroundColor.Transparent.v / 255
                }
            }
        });
    });
     
    return datas;
});

export const SetOSD = 
curryCMD( 'SetOSD', async (arg) => {
    let osd = arg[0];
    let setOSD = new schemas.tr2_SetOSD();

    setOSD.OSD = osd;
    
    await onvifCMD( 'media2', 'SetOSD', setOSD );
});