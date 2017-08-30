function SetText( elem, s ){
    if ( elem.firstElementChild )
        elem.childNodes[0].nodeValue = s;
    else {
        let xml = new window.DOMParser().parseFromString("<?xml version='1.0' encoding='UTF-8'?><ROOT></ROOT>", 'text/xml');
        let theText = xml.createTextNode( s );
        elem.appendChild( theText );
    }
}
function string_join(s){
    let ss = '';
    s.forEach((_s, index) => {
        if ( index === 0 )
            ss += _s;
        else
            ss += ` ${_s}`;
    });
    if ( ss.length === 0 )
        return '';
    return ss;
}

export const NS_PREFIX = {
    "http://www.onvif.org/ver10/error": "ter",
    "http://www.onvif.org/ver10/device/wsdl": "tds",
    "http://www.onvif.org/ver10/events/wsdl": "tev",
    "http://docs.oasis-open.org/wsn/bw-2": "wsntw",
    "http://www.onvif.org/ver10/display/wsdl": "tls",
    "http://www.onvif.org/ver10/deviceIO/wsdl": "tmd",
    "http://www.onvif.org/ver20/imaging/wsdl": "timg",
    "http://www.onvif.org/ver10/media/wsdl": "trt",
    "http://www.onvif.org/ver20/media/wsdl": "tr2",
    "http://www.onvif.org/ver20/ptz/wsdl": "tptz",
    "http://www.onvif.org/ver10/receiver/wsdl": "trv",
    "http://www.onvif.org/ver10/recording/wsdl": "trc",
    "http://www.onvif.org/ver10/search/wsdl": "tse",
    "http://www.onvif.org/ver10/replay/wsdl": "trp",
    "http://www.onvif.org/ver10/thermal/wsdl": "tth",
    "http://www.onvif.org/ver20/analytics/wsdl": "tan",
    "http://www.onvif.org/ver10/analyticsdevice/wsdl": "tad",
    "http://www.onvif.org/ver10/actionengine/wsdl": "tae",
    "http://www.onvif.org/ver10/accesscontrol/wsdl": "tac",
    "http://www.onvif.org/ver10/doorcontrol/wsdl": "tdc",
    "http://www.onvif.org/ver10/advancedsecurity/wsdl": "tas",
    "http://www.onvif.org/ver10/accessrules/wsdl": "tar",
    "http://www.onvif.org/ver10/credential/wsdl": "tsr",
    "http://www.onvif.org/ver10/schedule/wsdl": "tsc",
    "http://www.w3.org/2001/XMLSchema": "xsd",
    "http://www.onvif.org/ver10/schema": "tt",
    "http://docs.oasis-open.org/wsn/b-2": "wsnt",
    "http://www.w3.org/2005/08/addressing": "wsa5",
    "http://docs.oasis-open.org/wsrf/r-2": "wsrf-r",
    "http://docs.oasis-open.org/wsn/t-1": "wstop",
    "http://www.onvif.org/ver10/pacs": "pt",
    "http://docs.oasis-open.org/wsrf/rw-2": "wsrf-rw",
    "http://www.w3.org/2004/08/xop/include": "xop",
    "http://www.w3.org/2005/05/xmlmime": "xmime",
    "http://docs.oasis-open.org/wsrf/bf-2": "wsrf-bf",
    "http://www.w3.org/XML/1998/namespace": "ns",
    "http://www.w3.org/2003/05/soap-envelope": "soap",
    "http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd": "wsse",
    "http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd": "wsu",
    "http://schemas.xmlsoap.org/ws/2005/04/discovery": "wsdd",
    "http://schemas.xmlsoap.org/ws/2004/08/addressing": "wsa",
    "http://www.onvif.org/ver10/network/wsdl": "dn",
};

export class xsd_type {
    save_elem(obj, elem) { }
    load_elem(obj, elem) { }

    save_attr(obj, elem, attr) { }
    load_attr(obj, elem, attr) { }

    //   save_json(obj, jv) {}
    //   load_json(obj, jv) {}
}

export const 
    xsd_union = xsd_type,
    xsd_choice = xsd_type;

export class primitive extends xsd_type {
    constructor() {
        super();
        this.v = {};
    }
    save_elem(obj, elem) {
        let s = this.to_string();

        SetText(elem, s);
    }
    load_elem(obj, elem) {
        let p = elem.childNodes[0].nodeValue;
        if ( !p )
            return false;
        return this.parse( obj, elem, p );
    }

    save_attr(obj, elem, attr) {
        elem.setAttribute( attr, this.to_string() );
    }
    load_attr(obj, elem, attr) {
        let p = elem.getAttribute( attr );
        if ( !p )
            return false;
        return this.parse( obj, elem, p );
    }
    
    parse(obj, elem, s) {
        return true;
    }
    to_string() {
        return '';
    }
}

export const xsd_enum = primitive;

export class xsd_boolean extends primitive {
    constructor(v) { super(); this.v = v; }
    parse(obj, elem, s) {
        if (s === "0" || s === "false") {
            this.v = false;
            return true;
        }
        if (s === "1" || s === "true") {
            this.v = true;
            return true;
        }
        return false;
    }
    to_string() { return this.v ? "true" : "false"; }
}

export class xsd_int extends primitive {
    constructor(v) { super(); this.v = v; }
    parse(obj, elem, s) {
        this.v = parseInt(s, 10);
        return s.slice(-1) === s[s.length - 1];
    }
    to_string() {
        if (this.v)
            return this.v.toString();
        else
            return '0';
    }
}
export const xsd_integer = xsd_int;

export class xsd_unsignedInt extends primitive {
    constructor(v) { super(); this.v = v; }
    parse(obj, elem, s) {
        this.v = parseInt(s, 10);
        return s.slice(-1) === s[s.length - 1];
    }
    to_string() {
        if (this.v)
            return this.v.toString();
        else
            return '0';
    }
}
export const 
    xsd_positiveInteger = xsd_unsignedInt,
    xsd_nonNegativeInteger = xsd_unsignedInt;

export class xsd_float extends primitive {
    constructor(v) { super(); this.v = v; }
    parse(obj, elem, s) {
        this.v = parseFloat(s);
        return s.slice(-1) === s[s.length - 1];
    }
    to_string() {
        if (this.v)
            return this.v.toString();
        else
            return '0';
    }
}

export class xsd_string extends primitive {
    constructor(v) { super(); this.v = v; }
    load_elem( obj, elem ) {
        let p = elem.childNodes[0].nodeValue;
        if ( !p )
            return true;
        return this.parse( obj, elem, p );
    }
    parse(obj, elem, s) {
        this.v = s;
        return true;
    }
    to_string() { return this.v; }
}
export const
    xsd_language = xsd_string,
    xsd_token = xsd_string,
    xsd_ID = xsd_string,
    xsd_anyURI = xsd_string,
    xsd_anySimpleType = xsd_string,
    xsd_anyType = xsd_string,
    xsd_NCName = xsd_string;

export class xsd_dateTime extends primitive {
    constructor(v) { super(); this.v = v; }
    parse(obj, elem, s) { return false; }
    to_string() { console.warn('xsd_datetime.to_string()'); return ""; }
}

export class xsd_time extends primitive {
    constructor(v) { super(); this.v = v; }
    parse(obj, elem, s) { return false; }
    to_string() { console.warn('xsd_time.to_string()'); return ""; }
}

export class xsd_duration extends primitive {
    constructor(v) { super(); this.v = v; }
    parse(obj, elem, s) {
        if (s.length === 0 || s[0] !== 'P')
            return false;

        this.v = {
            years: '',
            months: '',
            days: '',
            hours: '',
            minutes: '',
            seconds: ''
        };

        let n = 0,
            t = false;

        [...s].forEach((_s) => {
            switch (_s) {
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    n = n * 10 + _s - '0';
                    break;
                case 'Y':
                    this.v.years = n;
                    n = 0;
                    break;
                case 'M':
                    if (t)
                        this.v.minutes = n;
                    else
                        this.v.months = n;
                    n = 0;
                    break;
                case 'D':
                    this.v.days = n;
                    n = 0;
                    break;
                case 'T':
                    t = true;
                    break;
                case 'H':
                    this.v.hours = n;
                    n = 0;
                    break;
                case 'S':
                    this.v.seconds = n;
                    n = 0;
                    break;
                default:
                    return false;
            }
        });
        return true;
    }
    to_string() {
        let ss = 'P';

        if (this.v.years !== 0)
            ss += `${this.v.years}Y`;
        if (this.v.months !== 0)
            ss += `${this.v.months}M`;
        if (this.v.days !== 0)
            ss += `${this.v.days}D`;

        ss += 'T';
        if (this.v.hours !== 0)
            ss += `${this.v.hours}H`;
        if (this.v.minutes !== 0)
            ss += `${this.v.minutes}M`;
        ss += `${this.v.seconds}S`;

        return ss;
    }
}

export class xsd_base64Binary extends primitive {
    constructor(v) { super(); this.v = v; }
    parse(obj, elem, s) {
        this.v = window.btoa(s);
        return true;
    }
    to_string() { return window.atob(this.v); }
}

export class xsd_hexBinary extends primitive {
    constructor(v) { super(); this.v = v; }
    parse(obj, elem, s) {
        if (s.length % 2 !== 0)
            return false;

        this.v = parseInt(s, 16);

        return true;
    }
    to_string() { return this.v.toString(16); }
}

export class xsd_QName extends primitive {
    constructor(prefix, name) { 
        super(); 
        this.v = {
            [prefix]: name
        }; 
    }
    load_v( obj, elem, s ){
        let ss = s.split(':');
        if ( ss.length !== 2 )
            return false;

        let ns = obj.find_namespace( elem, ss[0] );
        if ( !ns )
            return false;

        let prefix = NS_PREFIX[ns];
        this.v = { [prefix]: ss[1] };
        return true;
    }
    save_elem( obj, elem ) {
        SetText(elem, this.to_string());
        obj.add_prefix( Object.keys( this.v )[0] );
    }
    load_elem( obj, elem ) {
        let p = elem.childNodes[0].nodeValue;
        if ( !p )
            return false;

        return this.load_v( obj, elem, p );
    }
    save_attr( obj, elem, attr ){
        elem.setAttribute( attr, this.to_string() );
        obj.add_prefix( Object.keys( this.v )[0] );
    }
    load_attr( obj, elem, attr ){
        let p = elem.getAttribute( attr );
        if ( !p )
            return false;

        return this.load_v( obj, elem, p );
    }
    parse(obj, elem, s) {
        let ss = s.split(':');
        if ( ss.length !== 2 )
            return false;

        let ns = obj.find_namespace( elem, ss[0] );
        if ( !ns )
            return false;

        let prefix = NS_PREFIX[ns];
        this.v = { [prefix]: ss[1] };
        return true;
    }
    to_string() {
        return Object.keys(this.v)[0] + ":" + Object.values(this.v)[0];
    }
}

export class any_t extends xsd_type {
    constructor({ prefix, name, v }) {
        super();
        this.elem = new window.DOMParser().parseFromString("<?xml version='1.0' encoding='UTF-8'?><ROOT></ROOT>", 'text/xml');
        this.prefix = prefix;
        this.name = name;
        this.v = v;
    }
    save_elem( obj, elem ){
        this.v.save_elem( obj, elem );
    }
    load_elem( obj, elem ){
        this.elem = elem;
        return true;
    }
}

export class anyAttribute_t extends xsd_type {
    constructor({ name, v }) {
        super();
        this.name = name;
        this.v = v;
    }
    save_attr( obj, elem, attr ){
        elem.setAttribute( attr, this.v );
    }
    load_attr( obj, elem, attr ){
        let p = elem.getAttribute( attr );
        if( !p )
            return false;

        this.name = attr;
        this.v = p;
        return true;
    }
}

export class xsd_list extends xsd_type {
    constructor(type) {
        super();
        this.v = [];
        this.type = type;
    }
    save_elem( obj, elem ){
        this.v.forEach((_v) => {
            _v.save_elem( obj, elem );
        });
    }
}

export function xsd_simplelist(type){
    return class xsd_simplelist extends primitive{
        constructor() {
            super();
            this.v = [];
            this.type = type;
        }
        parse( obj, elem, s ){
            s.split( ' ' ).forEach((_s) => {
                let t = new this.type();
                if ( !t.parse( obj, elem, _s ) )
                    return false;
                this.v.push( t );
            });
            return true;
        }
        to_string(){
            let s = [];
            this.v.forEach((_v) => {
                s.push( _v.to_string() );
            });
            return string_join(s)
        }
    }
}