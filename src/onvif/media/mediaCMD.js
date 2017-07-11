/* eslint no-eval: 0 */

import * as lib from '../lib/libonvif';
import * as schemas from "../lib/onvif_schemas";
import * as binding from "../lib/onvif_bindings";

function createInput(cmd, ...args){
  let input = eval(`new schemas.tds.message.${cmd}Request()`);
  /*
  if ( cmd === 'CreateUsers' || cmd === 'SetUser' )
    args.forEach((arg) => { input.User.v.push(arg); });
  else if ( cmd === 'DeleteUsers' )
    args.forEach((arg) => { input.Username.v.push(arg); });
  else if ( cmd === 'SetHostname' )
    args.forEach((arg) => { input.Name.v = arg; });
  */
  return input;
}

export function mediaCMD(cmd, ...args){
  let obj = new lib.soap_object();
  obj.host = location.host;
  obj.username = "admin";
  obj.password = "admin";

  let input  = createInput(cmd, ...args),
      output = eval(`new schemas.trt.message.${cmd}Response()`);

  let run = eval(`binding.MediaBinding.${cmd}(obj, input, output)`);

  return new Promise( async (resolve, reject) => {
    try {
      await run ; 
    } catch(e) {
      reject(new Error('[Failed]'));
    }

    setTimeout(()=>{
      resolve( output );
    }, 500);

  });
}