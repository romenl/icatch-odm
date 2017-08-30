/* eslint no-eval: 0 */
import * as schemas from "../lib/onvif_schemas";
import * as binding from "../lib/onvif_bindings";

import { http_session } from '../lib/http_object';

function createInput(type, cmd, ...args){
  let input = eval(`new schemas.${type}.message.${cmd}Request()`);
  
  // Device
  if ( cmd === 'CreateUsers' || cmd === 'SetUser' )
    args.forEach((arg) => { input.User.v.push(arg); });
  else if ( cmd === 'DeleteUsers' )
    args.forEach((arg) => { input.Username.v.push(arg); });
  else if ( cmd === 'SetHostname' )
    args.forEach((arg) => { input.Name.v = arg; });
  // Media
  else if ( cmd === 'GetVideoEncoderConfiguration' || 
            cmd === 'GetVideoEncoderConfigurations' ||
            cmd === 'GetVideoEncoderConfigurationOptions' ||
            cmd === 'GetOSDOptions' ||
            cmd === 'GetOSDs'
          )
    args.forEach(arg => { input.ConfigurationToken.v = arg });
  else if ( cmd === 'SetVideoEncoderConfiguration' ||
            cmd === 'SetOSD' )
    args.forEach(arg => { input = arg });
  // Imaging
  else if ( cmd === 'GetImagingSettings' ||
            cmd === 'GetOptions' )
    args.forEach(arg => { input.VideoSourceToken.v = arg });
  else if ( cmd === 'SetImagingSettings' ){
    args.forEach(arg => { input = arg });
  }
  
  return input;
}

function createOutput(type, cmd){
  
  // Media
  if ( type === 'tr2' ){
    if ( cmd === 'SetOSD' ||
         cmd === 'SetVideoEncoderConfiguration' )
      cmd = 'SetConfiguration';  
  }
  
  return eval(`new schemas.${type}.message.${cmd}Response()`);
}

function getType( type ) {
  if ( type === 'device' )
    return {
      schemas: 'tds',
      binding: 'DeviceBinding'
    };
  else if ( type === 'media' )
    return {
      schemas: 'trt',
      binding: 'MediaBinding'
    };
  else if ( type === 'media2' )
    return {
      schemas: 'tr2',
      binding: 'Media2Binding'
    }
  else if ( type === 'imaging' )
    return {
      schemas: 'timg',
      binding: 'ImagingBinding'
    };

  console.error( 'Wrong type!!' );
  return {};
}

export default function onvifCMD(type, cmd, ...args){
  let session = new http_session();
  session.host = location.host;
  session.username = 'admin';
  session.password = 'admin';

  let onvif = getType( type );

  let input  = createInput(onvif.schemas, cmd, ...args),
      output = createOutput(onvif.schemas, cmd);

  return new Promise( (resolve, reject) => {
    try {
      eval(`binding.${onvif.binding}.${cmd}(session, input, output)`) ; 
    } catch(e) {
      reject(new Error('[Failed]'));
    }

    setTimeout(()=>{
      resolve( output );
    }, 500);

  });
}