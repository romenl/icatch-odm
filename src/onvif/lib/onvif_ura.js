import crypto from 'crypto';
import * as schemas from './onvif_schemas';
import * as types from './xsd_types';
import * as libonvif from './libonvif';

/*
    SAVE ELEMENT, ATTRIBUTE, ANY
*/
function save_element( obj, elem, prefix, name, v ){
    if ( !v )
        return;
        
    if (v instanceof types.xsd_list) {
        v.v.forEach((_v) => {
            let p = obj.new_element( elem, prefix, name );
            _v.save_elem( obj, p );
        });
    }
    else {
        let p = obj.new_element( elem, prefix, name );
        v.save_elem( obj, p );
    }
}

function save_attribute( obj, elem, prefix, name, v ){
    if ( !v || !v.v ) 
        return;

    v.save_attr( obj, elem, name );
}

function save_any( obj, elem, any ){
    if ( !any || !any.v )
        return;

    if (any instanceof types.xsd_list)
    {
      if (any.type === types.any_t){ // save_any(http_object* obj, tinyxml2::XMLElement* elem, xsd_list<any_t>& any)
        any.v.forEach((v) => {
            let p = obj.new_element( elem, v.prefix, v.name );
            v.save_elem( obj, p );
        });
      }
      else if ( any.type === types.anyAttribute_t ){ // save_any(http_object* obj, tinyxml2::XMLElement* elem, xsd_list<anyAttribute_t>& any)
        any.v.forEach((v) => {
            v.save_attr( obj, elem, v.name );
        });
      }
    }
    else if (any instanceof types.any_t){ // save_any(http_object* obj, tinyxml2::XMLElement* elem, any_t& any)
      let p = obj.new_element( elem, any.prefix, any.name );
      any.save_elem( obj, p );      
    }
}

export function SAVE_ELEM( obj, elem, prefix, name, v ) {
    save_element( obj, elem, prefix, name, v );
}
export function SAVE_ATTR( obj, elem, prefix, name, v ) {
    save_attribute( obj, elem, prefix, name, v );
}
export function SAVE_ANY_ELEM( obj, elem, any ) {
    save_any(obj, elem, any);
}
export function SAVE_ANY_ATTR( obj, elem, any ) {
    save_any(obj, elem, any);
}


/*
    LOAD ELEMENT, ATTRIBUTE, ANY
*/
function load_element( obj, elem, prefix, name, v ){    
    if ( v instanceof types.xsd_list ){
        let p = elem.firstElementChild;
        while( p ){
            if ( !obj.is_deleted(p) ){
                let tag = obj.find_tag(p);
                if ( tag === `${prefix}:${name}` ){
                    let t = new v.type();
                    if ( !t.load_elem(obj, p) )
                        return false;
                    v.v.push(t);
                    obj.delete_element(p);
                }
            }
            p = p.nextElementSibling;
        }
        return true;
    }
    else if ( v instanceof types.xsd_type ){
        let p = obj.find_child( elem, prefix, name );
        if ( !p )
            return false;

        // 2017.08.08 OA
        // [BUG solved] 解決 xsd_list<any_t> 中存有已 parse 之 element
        // p.s. libonvif 無 delete_element()，待確認是否會出現問題...
        obj.delete_element(p);
        return v.load_elem( obj, p );
    }
    else if ( v.isP ){
        let _v = libonvif.new_obj( v.constructor, obj );
        if ( !this.load_element( obj, elem, prefix, name, _v ) )
            return true;

        Object.assign( v, _v );
        return true;
    }
}

function load_attribute( obj, elem, prefix, name, v ){
    if ( v instanceof types.xsd_type ){
        if ( !v.load_attr( obj, elem, name ) )
            return false;

        elem.removeAttribute( name );
        return true;
    }
    else if ( v.isP ){
        let _v = libonvif.new_obj( v.constructor, obj );
        if ( !this.load_attribute( obj, elem, _v ) )
            return true;

        Object.assign( v, _v );
        return true;
    }
}

function load_any( obj, elem, any ){
    if ( any.isP ){
        debugger;
        let v = libonvif.new_obj( types.any_t, obj );
        if ( !this.load_any( obj, elem, v ) )
            return true;

        Object.assign( any, v );
        return true;
    }
    else if ( any instanceof types.xsd_list ){
        if ( any.type === types.any_t ){
            let p = elem.firstElementChild;
            while ( p ){
                if ( !obj.is_deleted(p) ){
                    any.v.push( new types.any_t({ v: p }) );
                    obj.delete_element( p );
                }
                p = p.nextElementSibling;
            }
            return true;
        }
        else if ( any.type === types.anyAttribute_t ){
            let del = [];
            let attributes = [...elem.attributes];

            attributes.forEach((p) => {
                let tag = p.name;
                if ( tag !== 'xmlns' && !tag.includes('xmlns:') ){
                    any.v.push( new types.anyAttribute_t({ name: tag, v: p.nodeValue }) );
                    del.push( tag );
                }
            });

            del.forEach((s) => {
                elem.removeAttribute(s);
            });
            
            return true;
        }
    }
    else if ( any instanceof types.any_t ){
        let p = elem.firstElementChild;
        if ( !p )
            return false;
        if ( obj.is_deleted(p) )
            return false;

        any = new types.any_t( {v: p} );
        obj.delete_element( p );
        return true;
    }
}

export function LOAD_ELEM( obj, elem, prefix, name, v ) {
    if ( !load_element( obj, elem, prefix, name, v ) )
        return false;
}
export function LOAD_ATTR( obj, elem, prefix, name, v ) {
    if ( !load_attribute( obj, elem, prefix, name, v ) )
        return false;
}
export function LOAD_ANY_ELEM( obj, elem, any ) {
    if ( !load_any( obj, elem, any ) )
        return false;
}
export function LOAD_ANY_ATTR( obj, elem, any ) {
    if ( !load_any( obj, elem, any ) )
        return false;
}
export function UNION_SAVE_ELEM( obj, elem, prefix, name, v ) {
    if ( v )
        return save_element( obj, elem, prefix, name, v );
}
export function UNION_LOAD_ELEM( obj, elem, prefix, name, v ) {
    if ( load_element( obj, elem, prefix, name, v ) )
        return true;
}

/*
    New Soap Envelope
 */
function password_digest(session){
  // timestamp
  let _now = new Date(Date.now()).toISOString();
  // uuid
  let uuid = new Buffer(16);
  uuid.writeUIntLE(Math.ceil(Math.random() * 0x100000000), 0, 4);
  uuid.writeUIntLE(Math.ceil(Math.random() * 0x100000000), 4, 4);
  uuid.writeUIntLE(Math.ceil(Math.random() * 0x100000000), 8, 4);
  uuid.writeUIntLE(Math.ceil(Math.random() * 0x100000000), 12, 4);
  // nonce
  let _nonce = new Buffer(uuid).toString('base64');
  // password
  let _sha1 = crypto.createHash('sha1');
  _sha1.update(Buffer.concat([uuid, new Buffer(_now, 'ascii'), new Buffer(session.password, 'ascii')]));
  let _password = _sha1.digest('base64');

  return {
    timestamp: _now,
    nonce: _nonce,
    password: _password,
  } ;
}

function new_soap_envelope( session, input_action ){
    let token = libonvif.new_obj( schemas.wsse_UsernameToken, session.input );
    token.Username.v = session.username;

    let password = libonvif.new_obj( schemas.wsse_Password, session.input );
    password.Type = libonvif.new_obj( schemas.xsd_anyURI, session.input, "http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordDigest" );
    token.any.v.push(new types.any_t( {prefix:schemas.PREFIX_WSSE, name:"Password", v:password} ));

    let _passwordDigest = password_digest(session);

    let nonce = libonvif.new_obj( schemas.wsse_Nonce, session.input );
    nonce.v = _passwordDigest.nonce;
    token.any.v.push(new types.any_t( {prefix:schemas.PREFIX_WSSE, name:"Nonce", v:nonce} ) );

    password.v = _passwordDigest.password;

    let created = libonvif.new_obj( schemas.wsu_Created, session.input );
    created.v = _passwordDigest.timestamp;
    token.any.v.push(new types.any_t( {prefix:schemas.PREFIX_WSU, name:"Created", v:created} ) );

    let security = libonvif.new_obj( schemas.wsse_Security, session.input );
    security.any.v.push(new types.any_t( {prefix:schemas.PREFIX_WSSE, name:"UsernameToken", v:token} ) );

    let envelope = libonvif.new_obj( schemas.soap_Envelope, session.input );
    envelope.Header = new schemas.soap_Header() ;
    envelope.Header.any.v.push(new types.any_t( {prefix:schemas.PREFIX_WSSE, name:"Security", v:security} ) );

    if ( input_action )
    {
    let action = libonvif.new_obj( schemas.wsa5_Action, session.input );
    action.v = input_action;
    envelope.Header.any.v.push(new types.any_t( {prefix:schemas.PREFIX_WSA, name:"Action", v:action} ) );
    }

    return envelope; 
}

/*
    ONVIF Operation
*/
export async function onvif_one_way_operation(
                session, 
                input_ns, input_name, input, input_action){

    let i_envelope = new_soap_envelope(session, input_action);
    i_envelope.Body.any.v.push(new types.any_t({prefix:input_ns, name:input_name, v:input}));

    i_envelope.save_elem( session.input, session.input.new_element( null, schemas.PREFIX_SOAP, 'Envelope' ) );
    session.input.done();

    if( !(await session.post()) )
        return false;
    return true;
}

export async function onvif_request_response_operation(
                session,
                input_ns, input_name, input, input_action,
                output_ns, output_name, output, output_action){
    let i_envelope = new_soap_envelope(session, input_action);
    i_envelope.Body.any.v.push(new types.any_t( {prefix:input_ns, name:input_name, v:input} ));

    i_envelope.save_elem( session.input, session.input.new_element( null, schemas.PREFIX_SOAP, 'Envelope' ) );
    session.input.done();

    if ( !(await session.post()) )
        return false;
    
    if ( !session.output.parse() )
        return false;
    
    if ( !session.output.check_element(null, schemas.PREFIX_SOAP, 'Envelope') )
        return false;
    
    let o_envelope = session.output.envelope;
    if ( !o_envelope.load_elem( session.output, session.output.xml.documentElement ) ) //firstElementChild (RootElement)
        return false;
    
    if ( o_envelope.Body.any.v.length !== 1 )
        return false;
    
    let r = o_envelope.Body.any.v[0].v;
    if ( !session.output.check_element( r, output_ns, output_name ) )
        return false;
    
    if ( !output.load_elem( session.output, r ) )
        return false;
    
    return true;
}