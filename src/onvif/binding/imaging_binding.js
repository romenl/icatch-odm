import * as schemas from "../lib/onvif_schemas";
import { curryCMD, getKey } from './utils';
import onvifCMD from './onvifCMD';

export const GetOptions = 
curryCMD( 'GetOptions', async (arg) => {
    let token = arg[0];
    let res = await onvifCMD( 'imaging', 'GetOptions', token );
    let options = res.ImagingOptions;
    
    const irCutOptions = [{
        value: '0',
        name: 'ON'
    },{
        value: '1',
        name: 'OFF'
    },{
        value: '2',
        name: 'AUTO'
    }];

    const whiteBalanceOptions =[{
        value: '0',
        name: 'MANUAL'
    },{
        value: '1',
        name: 'AUTO'
    }];

    const onOffMode = {
        OFF: 0,
        ON: 1
    };
    
    return {
        BacklightCompensation: {
            Mode: onOffMode,
            Level: {
                Min: options.BacklightCompensation.Level.Min.v,
                Max: options.BacklightCompensation.Level.Max.v
            }
        },
        Brightness: {
            Min: options.Brightness.Min.v,
            Max: options.Brightness.Max.v
        },
        ColorSaturation: {
            Min: options.ColorSaturation.Min.v,
            Max: options.ColorSaturation.Max.v
        },
        Contrast: {
            Min: options.Contrast.Min.v,
            Max: options.Contrast.Max.v
        },
        Exposure: {
            Mode: {
                AUTO: 0,
                MANUAL: 1
            },
            ExposureTime: {
                Min: options.Exposure.ExposureTime.Min.v,
                Max: options.Exposure.ExposureTime.Max.v
            }
        },            
        IrCutFilter: irCutOptions,
        Sharpness: {
            Min: options.Sharpness.Min.v,
            Max: options.Sharpness.Max.v
        },
        WideDynamicRange: {
            Mode: onOffMode,
            Level: {
                Min: options.WideDynamicRange.Level.Min.v,
                Max: options.WideDynamicRange.Level.Max.v
            }
        },
        WhiteBalance: {
            Mode: whiteBalanceOptions,
            CbGain:{
                Min: options.WhiteBalance.YbGain.Min.v,
                Max: options.WhiteBalance.YbGain.Max.v,
            },
            CrGain:{
                Min: options.WhiteBalance.YrGain.Min.v,
                Max: options.WhiteBalance.YrGain.Max.v,
            }
        }
        //Focus
    };
});

export const GetImagingSettings = 
curryCMD( 'GetImagingSettings', async (arg) => {
    let token = arg[0];
    let res = await onvifCMD( 'imaging', 'GetImagingSettings', token );
    let settings = res.ImagingSettings;

    return {
        data: settings,
        BacklightCompensation: {
            Mode: getKey(settings.BacklightCompensation.Mode),
            Level: settings.BacklightCompensation.Level.v
        },
        Brightness: settings.Brightness.v,
        ColorSaturation: settings.ColorSaturation.v,
        Contrast: settings.Contrast.v,
        Exposure: {
            Mode: getKey( settings.Exposure.Mode ),
            ExposureTime: settings.Exposure.ExposureTime.v
        },
        IrCutFilter: getKey(settings.IrCutFilter),
        Sharpness: settings.Sharpness.v,
        WideDynamicRange: {
            Mode: getKey(settings.WideDynamicRange.Mode),
            Level: settings.WideDynamicRange.Level.v
        },
        WhiteBalance: {
            Mode: getKey( settings.WhiteBalance.Mode ),
            CbGain: settings.WhiteBalance.CbGain.v,
            CrGain: settings.WhiteBalance.CrGain.v
        }
    };
});

export const SetImagingSettings = 
curryCMD( 'SetImagingSettings', async (arg) => {
    let settings = arg[0];
    let setImagingSettings = new schemas.timg_SetImagingSettings();
    setImagingSettings.VideoSourceToken.v = '0';
    
    setImagingSettings.ImagingSettings = settings;
    await onvifCMD( 'imaging', 'SetImagingSettings', setImagingSettings );
});