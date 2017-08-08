/* eslint no-eval: 0 */

export function add_obj( obj, t ){
    obj.add_obj( t );
}
export function new_obj( T, obj, ...args ){
    let t = new T(...args);
    add_obj( obj, t );
    return t;
}
export function onvif_find_any( obj, parent, prefix, name, t ){
    parent.any.v.forEach((v) => {
        let tag = obj.find_tag( v.elem );
        if( tag === `${prefix}:${name}` )
            return t.load_elem( obj, v.elem );
    });
    return false;
}