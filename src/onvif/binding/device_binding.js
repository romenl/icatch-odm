import * as schemas from "../lib/onvif_schemas";
import onvifCMD from './onvifCMD';

/** User's Level **/
const UserLevel = {
    0: 'Administrator',
    1: 'Operator',
    2: 'User',
    //3: 'Anonymous',
    //4: 'Extended'
}

/**
 * Get key value from option object. (eg: { 'Manual': 0, 'NTP': 1 })
 * 
 * @param {any} obj 
 * @returns string
 */
function getValue( obj ) {
    if ( obj && obj.v !== undefined )
        return Object.keys( obj )[obj.v + 1];
    else
        return false;
}

/**
 * GetUsers()
 * 
 * @export
 * @returns array [{key, user_name, user_level}]
 */
export async function GetUsers() {
    try {
        let res = await onvifCMD( 'device', 'GetUsers' );
        let users = res.User.v;
        let datas = [];

        users.forEach((user, index) => {
            let u = {
                key: index,
                user_name: user.Username.v,
                user_level: getValue( user.UserLevel )
            }

            datas.push(u);
        });

        return datas;

    } catch(e) {
        console.log("[GetUsers] ", e);
    }
}

/**
 * CreateUsers()
 * 
 * @export
 * @param {key, user_name, user_level} user 
 */
export async function CreateUsers( user ) {
    try {
        let _user = new schemas.tt_User();
        _user.Username.v = user.name;
        _user.Password.v = user.password;
        _user.UserLevel.v = Object.values( UserLevel ).findIndex( (v) => v === user.level );

        await onvifCMD( 'device', 'CreateUsers', _user );
    } catch(e) {
        console.log("[CreateUsers] ", e);
    }
}

/**
 * SetUser()
 * 
 * @export
 * @param {key, user_name, user_level} user 
 */
export async function SetUser( user ) {
    try {
        let _user = new schemas.tt_User();
        _user.Username.v = user.name;
        _user.Password.v = user.password;
        _user.UserLevel.v = Object.values( UserLevel ).findIndex( (v) => user.level === v );

        await onvifCMD( 'device', 'SetUser', _user );
    } catch(e) {
        console.log("[SetUser] ", e);
    }
}

/**
 * DeleteUsers() by pass user's name.
 * 
 * @export
 * @param string userName 
 */
export async function DeleteUsers( userName ) {
    try {
        await onvifCMD( 'device', 'DeleteUsers', userName );
    } catch(e) {
        console.log("[SetUser] ", e);
    }
}

/**
 * GetDeviceInformation()
 * 
 * @export
 * @return object {Model, FirmwareVersion, Manufacturer, SerialNumber, HardwareId}
 */
export async function GetDeviceInformation() {
    try {
        let res = await onvifCMD( 'device', 'GetDeviceInformation' );
        let info = {
            Model: res.Model.v,
            FirmwareVersion: res.FirmwareVersion.v,
            Manufacturer: res.Manufacturer.v,
            SerialNumber: res.SerialNumber.v,
            HardwareId: res.HardwareId.v
        };

        return info;
    } catch(e) {
        console.log("[GetDeviceInformation] ", e);
    }    
}

/**
 * GetHostname()
 * 
 * @export
 * @return string hostname
 */
export async function GetHostname() {
    try {
        let res = await onvifCMD( 'device', 'GetHostname' );
        let hostname = res.HostnameInformation.Name.v;
        
        return hostname;
    } catch(e) {
        console.log("[GetHostname] ", e);
    }    
}

/**
 * SetHostname()
 * 
 * @export
 * @param string hostname 
 */
export async function SetHostname( hostname ) {
    try {
        await onvifCMD( 'device', 'SetHostname', hostname );
    } catch(e) {
        console.log("[SetUser] ", e);
    }
}

/**
 * SystemReboot()
 * 
 * @export
 */
export async function SystemReboot() {
    try {
        await onvifCMD( 'device', 'SystemReboot' );
    } catch(e) {
        console.log("[SystemReboot] ", e);
    }
}

/**
 * GetNetworkInterfaces()
 * 
 * @export
 * @return object networkinterface
 */
export async function GetNetworkInterfaces() {
    try {
        let res = await onvifCMD( 'device', 'GetNetworkInterfaces' );
        let networkinterface = res.NetworkInterfaces.v;
    
        return networkinterface;
    } catch(e) {
        console.log("[GetNetworkInterfaces] ", e);
    }
}

/**
 * GetDiscoveryMode()
 * 
 * @export
 * @returns boolean
 */
export async function GetDiscoveryMode() {
    try {
        let res = await onvifCMD( 'device', 'GetDiscoveryMode' );
        let discoveryMode = res.DiscoveryMode.v;

        return discoveryMode === 0 ? true : false;
    } catch(e) {
        console.log("[GetDiscoveryMode] ", e);
    }
}

/**
 * GetNTP()
 * 
 * @export
 * @returns array
 */
export async function GetNTP() {
    try {
        let res = await onvifCMD( 'device', 'GetNTP' );
        let ntp = res.NTPInformation;
        let info = [];

        if ( ntp.FromDHCP.v )
            ntp.NTPFromDHCP.v.forEach( (n) => info.push(n) );
        else
            ntp.NTPManual.v.forEach( (n) => info.push(n) );
        
        return info;
    } catch(e) {
        console.log("[GetNTP] ", e);
    }
}

/**
 * GetDNS()
 * 
 * @export
 * @returns array
 */
export async function GetDNS() {
    try {
        let res = await onvifCMD( 'device', 'GetDNS' );
        let dns = res.DNSInformation;
        let ip_address = [];

        if ( dns.FromDHCP.v )
            dns.DNSFromDHCP.v.forEach( (d) => ip_address.push(d));
        else
            dns.DNSManual.v.forEach( (d) => ip_address.push(d));

        return ip_address;
    } catch(e) {
        console.log("[GetDNS] ", e);
    }
}

/**
 * GetNetworkProtocols()
 * 
 * @export
 * @returns object {[name]: {enable, port[]}}
 */
export async function GetNetworkProtocols() {
    try {
        let res = await onvifCMD( 'device', 'GetNetworkProtocols' );
        let protocols = {};

        res.NetworkProtocols.v.forEach((p) => {
            let name = getValue(p.Name);
            let ports = [];

            p.Port.v.forEach((port) => ports.push(port.v));

            protocols[name] = {
                enable: p.Enabled.v,
                port: ports
            };
        });

        return protocols;
    } catch(e) {
        console.log("[GetNetworkProtocols] ", e);
    }
}

/**
 * GetSystemDateAndTime()
 * 
 * @export
 * @returns object sdt
 */
export async function GetSystemDateAndTime() {
    try {
        let res = await onvifCMD( 'device', 'GetSystemDateAndTime' );
        let dt = res.SystemDateAndTime;
        let sdt = {
            sync_type: getValue(dt.DateTimeType),
            daylightSavings: dt.DaylightSavings.v,
            tz: dt.TimeZone.TZ.v,
            local: new Date(
                dt.LocalDateTime.Date.Year.v,   // year
                dt.LocalDateTime.Date.Month.v,  // month
                dt.LocalDateTime.Date.Day.v,    // day
                dt.LocalDateTime.Time.Hour.v,   // hour
                dt.LocalDateTime.Time.Minute.v, // minute
                dt.LocalDateTime.Time.Second.v, // second
            ),
            utc: new Date(
                dt.UTCDateTime.Date.Year.v,   // year
                dt.UTCDateTime.Date.Month.v,  // month
                dt.UTCDateTime.Date.Day.v,    // day
                dt.UTCDateTime.Time.Hour.v,   // hour
                dt.UTCDateTime.Time.Minute.v, // minute
                dt.UTCDateTime.Time.Second.v, // second
            )
        };

        return sdt;
    } catch(e) {
        console.log("[GetSystemDateAndTime] ", e);
    }
}