import * as lib from './libonvif';
import * as schemas from "./onvif_schemas";
import * as binding from "./onvif_bindings";

function createInput(cmd, ...args){
  let input  = eval('new schemas.tds.message.' + cmd + 'Request()');

  if ( cmd === 'CreateUsers' || cmd === 'SetUser' )
    args.forEach((arg) => { input.User.v.push(arg); });
  else if ( cmd === 'DeleteUsers' )
    args.forEach((arg) => { input.Username.v.push(arg); });

  return input;
}

export default function runCMD(cmd, ...args){
  let obj = new lib.soap_object();
  obj.host = location.host;
  obj.username = "admin";
  obj.password = "admin";

  let input  = createInput(cmd, ...args),
      output = eval('new schemas.tds.message.' + cmd + 'Response()');  

  let runCMD = eval('binding.DeviceBinding.' + cmd + '(obj, input, output)');

  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      if ( runCMD )
        resolve( output );
      else
        reject(new Error('[Failed]'));
    }, 500);
    
  });
}