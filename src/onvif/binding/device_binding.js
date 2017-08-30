import * as schemas from "../lib/onvif_schemas";
import { curryCMD, getKey } from './utils';
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
 * GetUsers()
 * 
 * @export
 * @returns array [{key, user_name, user_level}]
 */
export const GetUsers = 
curryCMD( 'GetUsers', async () => {
    let res = await onvifCMD( 'device', 'GetUsers' );
    let users = res.User.v;
    let datas = [];

    users.forEach((user, index) => {
        let u = {
            key: index,
            user_name: user.Username.v,
            user_level: getKey( user.UserLevel )
        }

        datas.push(u);
    });

    return datas;
});

/**
 * CreateUsers()
 * 
 * @export
 * @param {key, user_name, user_level} user 
 */
export const CreateUsers = 
curryCMD( 'CreateUsers', async (arg) => {
    let user = arg[0];
    let _user = new schemas.tt_User();
        _user.Username.v = user.name;
        _user.Password.v = user.password;
        _user.UserLevel.v = Object.values( UserLevel ).findIndex( (v) => v === user.level );

    await onvifCMD( 'device', 'CreateUsers', _user );
});

/**
 * SetUser()
 * 
 * @export
 * @param {key, user_name, user_level} user 
 */
export const SetUser = 
curryCMD( 'SetUser', async (arg) => {
    let user = arg[0];
    let _user = new schemas.tt_User();        
        _user.Username.v = user.name;
        _user.Password.v = user.password;
        _user.UserLevel.v = Object.values( UserLevel ).findIndex( (v) => user.level === v );

        await onvifCMD( 'device', 'SetUser', _user );
});

/**
 * DeleteUsers() by pass user's name.
 * 
 * @export
 * @param string userName 
 */
export const DeleteUsers = 
curryCMD( 'DeleteUsers', async (arg) => {
    let userName = new schemas.xsd_string();
    userName.v = arg[0];
    await onvifCMD( 'device', 'DeleteUsers', userName );
});

/**
 * GetDeviceInformation()
 * 
 * @export
 * @return object {Model, FirmwareVersion, Manufacturer, SerialNumber, HardwareId}
 */
export const GetDeviceInformation = 
curryCMD( 'GetDeviceInformation', async (arg) => {
    let res = await onvifCMD( 'device', 'GetDeviceInformation' );
    let info = {
        Model: res.Model.v,
        FirmwareVersion: res.FirmwareVersion.v,
        Manufacturer: res.Manufacturer.v,
        SerialNumber: res.SerialNumber.v,
        HardwareId: res.HardwareId.v
    };

    return info;
});

/**
 * GetHostname()
 * 
 * @export
 * @return string hostname
 */
export const GetHostname = 
curryCMD( 'GetHostname', async (arg) => {
    let res = await onvifCMD( 'device', 'GetHostname' );
    let hostname = res.HostnameInformation.Name.v;
    
    return hostname;
});

/**
 * SetHostname()
 * 
 * @export
 * @param string hostname 
 */
export const SetHostname = 
curryCMD( 'SetHostname', async (arg) => {
    let hostname = arg[0];
    await onvifCMD( 'device', 'SetHostname', hostname );
});

/**
 * SystemReboot()
 * 
 * @export
 */
export const SystemReboot = 
curryCMD( 'SystemReboot', async (arg) => {
    await onvifCMD( 'device', 'SystemReboot' );
});

/**
 * GetNetworkInterfaces()
 * 
 * @export
 * @return object networkinterface
 */
export const GetNetworkInterfaces = 
curryCMD( 'GetNetworkInterfaces', async (arg) => {
    let res = await onvifCMD( 'device', 'GetNetworkInterfaces' );
    let networkinterface = res.NetworkInterfaces.v;

    return networkinterface;
});

/**
 * GetDiscoveryMode()
 * 
 * @export
 * @returns boolean
 */
export const GetDiscoveryMode = 
curryCMD( 'GetDiscoveryMode', async (arg) => {
    let res = await onvifCMD( 'device', 'GetDiscoveryMode' );
    let discoveryMode = res.DiscoveryMode.v;

    return discoveryMode === 0 ? true : false;
});

/**
 * GetNTP()
 * 
 * @export
 * @returns array
 */
export const GetNTP = 
curryCMD( 'GetNTP', async (arg) => {
    let res = await onvifCMD( 'device', 'GetNTP' );
    let ntp = res.NTPInformation;
    let info = [];

    if ( ntp.FromDHCP.v )
        ntp.NTPFromDHCP.v.forEach( (n) => info.push(n) );
    else
        ntp.NTPManual.v.forEach( (n) => info.push(n) );
    
    return info;
});

/**
 * GetDNS()
 * 
 * @export
 * @returns array
 */
export const GetDNS = 
curryCMD( 'GetDNS', async (arg) => {
    let res = await onvifCMD( 'device', 'GetDNS' );
    let dns = res.DNSInformation;
    let ip_address = [];

    if ( dns.FromDHCP.v )
        dns.DNSFromDHCP.v.forEach( (d) => ip_address.push(d));
    else
        dns.DNSManual.v.forEach( (d) => ip_address.push(d));

    return ip_address;
});

/**
 * GetNetworkProtocols()
 * 
 * @export
 * @returns object {[name]: {enable, port[]}}
 */
export const GetNetworkProtocols = 
curryCMD( 'GetNetworkProtocols', async (arg) => {
    let res = await onvifCMD( 'device', 'GetNetworkProtocols' );
    let protocols = {};
    
    res.NetworkProtocols.v.forEach((p) => {
        let name = getKey(p.Name);
        let ports = [];

        p.Port.v.forEach((port) => ports.push(port.v));

        protocols[name] = {
            enable: p.Enabled.v,
            port: ports[0]
        };
    });

    return protocols;
});

/**
 * GetSystemDateAndTime()
 * 
 * @export
 * @returns object sdt
 */
export const GetSystemDateAndTime = 
curryCMD( 'GetSystemDateAndTime', async (arg) => {
    let res = await onvifCMD( 'device', 'GetSystemDateAndTime' );
    let dt = res.SystemDateAndTime;
    let sdt = {
        sync_type: getKey(dt.DateTimeType),
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
});