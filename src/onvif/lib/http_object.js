import * as schemas from './onvif_schemas';

class buffer {
    constructor(){
        this.len = 0;
        this.buf = '';
    }
    fill(len, buf){
        this.buf = buf;

        // len is not necessary ?
        this.len = len || buf.length;
    }
    write( path ){
        debugger;
    }
}

export class http_object {
    constructor(){
        this.m_objs    = [];
        this.xml_p     = new window.DOMParser();
        this.xml       = new window.DOMParser().parseFromString("<?xml version='1.0' encoding='UTF-8'?><ROOT></ROOT>", 'text/xml');
        this.m_prefix  = [];
        this.m_deleted = [];
        this.envelope  = new schemas.soap_Envelope();
        this.header    = new buffer();
        this.content   = new buffer();
    }
    add_obj( obj ){
        this.m_objs.push(obj);
    }
    new_element( parent, prefix, name ){
        let elem;

        if ( !prefix )
            elem = this.xml.createElement(name);
        else
            elem = this.xml.createElement(`${prefix}:${name}`);

        if ( !parent )
            this.xml.documentElement.appendChild( elem );
        else
            parent.appendChild(elem);

        this.add_prefix( prefix );
        return elem;
    }
    parse(){
        try{
            this.xml = this.xml_p.parseFromString( this.content.buf, 'text/xml' );
            return true;
        }
        catch(e){
            console.error('[ERROR in parse] ', e);
            return false;
        }
    }
    done(){
        let root = this.xml.documentElement.firstElementChild;
        this.m_prefix.forEach((prefix) => {
            let ss = `xmlns:${prefix}`;
            root.setAttribute(ss, schemas.NAMESPACES[prefix]);
        });

        this.content.fill(this.xml.documentElement.innerHTML.length, this.xml.documentElement.innerHTML);
        //this.content.len--;
    }
    add_prefix( prefix ){
        this.m_prefix.push( prefix );
    }
    find_namespace( elem, prefix ){
        if( !elem )
            return '';

        let ss = 'xmlns';
        if ( prefix )
            ss += `:${prefix}`;

        let attr = elem.getAttribute(ss);
        if ( attr )
            return attr;

        return this.find_namespace( elem.parentNode, prefix );
    }
    find_tag( elem ){
        let p = elem.nodeName.split(':');
        if ( p.length === 1 )
            return schemas.NS_PREFIX[this.find_namespace(elem, null)] + ':' + p[0];
        return schemas.NS_PREFIX[this.find_namespace(elem, p[0])] + ':' + p[1];
    }
    find_child( parent, prefix, name ){
        let elem = parent.firstElementChild;
        while ( elem ){
            if ( !this.is_deleted(elem) ){
                let tag = this.find_tag(elem);
                if ( tag === `${prefix}:${name}` )
                    return elem;
            }
            elem = elem.nextElementSibling;
        }
        return null;
    }
    check_element( elem, prefix, name ){
        if ( !elem )
            elem = this.xml.documentElement; //firstElementChild (RootElement)

        let tag = this.find_tag(elem);
        if ( tag !== `${prefix}:${name}` )
            return false;
        return true;
    }
    is_deleted( elem ){
        if ( !this.m_deleted.includes(elem) )
            return false;
        return true;
    }
    delete_element( elem ){
        this.m_deleted.push(elem);
    }
}

export class http_session {
    constructor(){
        this.protocol  = "http";
        this.host      = "";
        this.port      = 80;
        this.url       = "/onvif/device_service";
        this.username  = "";
        this.password  = "";
        this.input     = new http_object();
        this.output    = new http_object();
    }

    createFetchAPI(){
        let request = new Request(
                        location.origin + '/onvif/device_service', 
                        {
                        mode: 'no-cors',
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/soap+xml',
                            'Content-Length': this.input.content.len,
                            charset: 'utf-8'
                        },
                        body: this.input.content.buf
                        }
                    );
                    
        return fetch(request);
    }

    async post(){
        let api = this.createFetchAPI();
        let status = false;
        
        await api.then((response) => {
            if ( response.ok ) {
                this.output.header.fill(response.headers);
                return response.text();
            }
            else
                throw Error( response.statusText );
        }).then((text) => {
            this.output.content.fill(text.length, text);
            status = true;
        }).catch((err) => {
            console.log('Error with request: ', err);
            status = false;
        });

        return status;
    }
}