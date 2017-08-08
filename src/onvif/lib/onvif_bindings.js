import * as ura from "./onvif_ura";

export const DeviceBinding =
{
    GetServices( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "GetServices", input, null, "tds", "GetServicesResponse", output, null);
    },
    GetServiceCapabilities( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "GetServiceCapabilities", input, null, "tds", "GetServiceCapabilitiesResponse", output, null);
    },
    GetDeviceInformation( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "GetDeviceInformation", input, null, "tds", "GetDeviceInformationResponse", output, null);
    },
    SetSystemDateAndTime( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "SetSystemDateAndTime", input, null, "tds", "SetSystemDateAndTimeResponse", output, null);
    },
    GetSystemDateAndTime( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "GetSystemDateAndTime", input, null, "tds", "GetSystemDateAndTimeResponse", output, null);
    },
    SetSystemFactoryDefault( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "SetSystemFactoryDefault", input, null, "tds", "SetSystemFactoryDefaultResponse", output, null);
    },
    UpgradeSystemFirmware( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "UpgradeSystemFirmware", input, null, "tds", "UpgradeSystemFirmwareResponse", output, null);
    },
    SystemReboot( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "SystemReboot", input, null, "tds", "SystemRebootResponse", output, null);
    },
    RestoreSystem( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "RestoreSystem", input, null, "tds", "RestoreSystemResponse", output, null);
    },
    GetSystemBackup( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "GetSystemBackup", input, null, "tds", "GetSystemBackupResponse", output, null);
    },
    GetSystemLog( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "GetSystemLog", input, null, "tds", "GetSystemLogResponse", output, null);
    },
    GetSystemSupportInformation( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "GetSystemSupportInformation", input, null, "tds", "GetSystemSupportInformationResponse", output, null);
    },
    GetScopes( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "GetScopes", input, null, "tds", "GetScopesResponse", output, null);
    },
    SetScopes( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "SetScopes", input, null, "tds", "SetScopesResponse", output, null);
    },
    AddScopes( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "AddScopes", input, null, "tds", "AddScopesResponse", output, null);
    },
    RemoveScopes( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "RemoveScopes", input, null, "tds", "RemoveScopesResponse", output, null);
    },
    GetDiscoveryMode( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "GetDiscoveryMode", input, null, "tds", "GetDiscoveryModeResponse", output, null);
    },
    SetDiscoveryMode( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "SetDiscoveryMode", input, null, "tds", "SetDiscoveryModeResponse", output, null);
    },
    GetRemoteDiscoveryMode( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "GetRemoteDiscoveryMode", input, null, "tds", "GetRemoteDiscoveryModeResponse", output, null);
    },
    SetRemoteDiscoveryMode( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "SetRemoteDiscoveryMode", input, null, "tds", "SetRemoteDiscoveryModeResponse", output, null);
    },
    GetDPAddresses( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "GetDPAddresses", input, null, "tds", "GetDPAddressesResponse", output, null);
    },
    GetEndpointReference( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "GetEndpointReference", input, null, "tds", "GetEndpointReferenceResponse", output, null);
    },
    GetRemoteUser( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "GetRemoteUser", input, null, "tds", "GetRemoteUserResponse", output, null);
    },
    SetRemoteUser( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "SetRemoteUser", input, null, "tds", "SetRemoteUserResponse", output, null);
    },
    GetUsers( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "GetUsers", input, null, "tds", "GetUsersResponse", output, null);
    },
    CreateUsers( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "CreateUsers", input, null, "tds", "CreateUsersResponse", output, null);
    },
    DeleteUsers( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "DeleteUsers", input, null, "tds", "DeleteUsersResponse", output, null);
    },
    SetUser( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "SetUser", input, null, "tds", "SetUserResponse", output, null);
    },
    GetWsdlUrl( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "GetWsdlUrl", input, null, "tds", "GetWsdlUrlResponse", output, null);
    },
    GetCapabilities( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "GetCapabilities", input, null, "tds", "GetCapabilitiesResponse", output, null);
    },
    SetDPAddresses( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "SetDPAddresses", input, null, "tds", "SetDPAddressesResponse", output, null);
    },
    GetHostname( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "GetHostname", input, null, "tds", "GetHostnameResponse", output, null);
    },
    SetHostname( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "SetHostname", input, null, "tds", "SetHostnameResponse", output, null);
    },
    SetHostnameFromDHCP( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "SetHostnameFromDHCP", input, null, "tds", "SetHostnameFromDHCPResponse", output, null);
    },
    GetDNS( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "GetDNS", input, null, "tds", "GetDNSResponse", output, null);
    },
    SetDNS( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "SetDNS", input, null, "tds", "SetDNSResponse", output, null);
    },
    GetNTP( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "GetNTP", input, null, "tds", "GetNTPResponse", output, null);
    },
    SetNTP( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "SetNTP", input, null, "tds", "SetNTPResponse", output, null);
    },
    GetDynamicDNS( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "GetDynamicDNS", input, null, "tds", "GetDynamicDNSResponse", output, null);
    },
    SetDynamicDNS( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "SetDynamicDNS", input, null, "tds", "SetDynamicDNSResponse", output, null);
    },
    GetNetworkInterfaces( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "GetNetworkInterfaces", input, null, "tds", "GetNetworkInterfacesResponse", output, null);
    },
    SetNetworkInterfaces( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "SetNetworkInterfaces", input, null, "tds", "SetNetworkInterfacesResponse", output, null);
    },
    GetNetworkProtocols( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "GetNetworkProtocols", input, null, "tds", "GetNetworkProtocolsResponse", output, null);
    },
    SetNetworkProtocols( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "SetNetworkProtocols", input, null, "tds", "SetNetworkProtocolsResponse", output, null);
    },
    GetNetworkDefaultGateway( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "GetNetworkDefaultGateway", input, null, "tds", "GetNetworkDefaultGatewayResponse", output, null);
    },
    SetNetworkDefaultGateway( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "SetNetworkDefaultGateway", input, null, "tds", "SetNetworkDefaultGatewayResponse", output, null);
    },
    GetZeroConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "GetZeroConfiguration", input, null, "tds", "GetZeroConfigurationResponse", output, null);
    },
    SetZeroConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "SetZeroConfiguration", input, null, "tds", "SetZeroConfigurationResponse", output, null);
    },
    GetIPAddressFilter( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "GetIPAddressFilter", input, null, "tds", "GetIPAddressFilterResponse", output, null);
    },
    SetIPAddressFilter( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "SetIPAddressFilter", input, null, "tds", "SetIPAddressFilterResponse", output, null);
    },
    AddIPAddressFilter( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "AddIPAddressFilter", input, null, "tds", "AddIPAddressFilterResponse", output, null);
    },
    RemoveIPAddressFilter( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "RemoveIPAddressFilter", input, null, "tds", "RemoveIPAddressFilterResponse", output, null);
    },
    GetAccessPolicy( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "GetAccessPolicy", input, null, "tds", "GetAccessPolicyResponse", output, null);
    },
    SetAccessPolicy( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "SetAccessPolicy", input, null, "tds", "SetAccessPolicyResponse", output, null);
    },
    CreateCertificate( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "CreateCertificate", input, null, "tds", "CreateCertificateResponse", output, null);
    },
    GetCertificates( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "GetCertificates", input, null, "tds", "GetCertificatesResponse", output, null);
    },
    GetCertificatesStatus( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "GetCertificatesStatus", input, null, "tds", "GetCertificatesStatusResponse", output, null);
    },
    SetCertificatesStatus( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "SetCertificatesStatus", input, null, "tds", "SetCertificatesStatusResponse", output, null);
    },
    DeleteCertificates( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "DeleteCertificates", input, null, "tds", "DeleteCertificatesResponse", output, null);
    },
    GetPkcs10Request( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "GetPkcs10Request", input, null, "tds", "GetPkcs10RequestResponse", output, null);
    },
    LoadCertificates( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "LoadCertificates", input, null, "tds", "LoadCertificatesResponse", output, null);
    },
    GetClientCertificateMode( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "GetClientCertificateMode", input, null, "tds", "GetClientCertificateModeResponse", output, null);
    },
    SetClientCertificateMode( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "SetClientCertificateMode", input, null, "tds", "SetClientCertificateModeResponse", output, null);
    },
    GetRelayOutputs( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "GetRelayOutputs", input, null, "tds", "GetRelayOutputsResponse", output, null);
    },
    SetRelayOutputSettings( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "SetRelayOutputSettings", input, null, "tds", "SetRelayOutputSettingsResponse", output, null);
    },
    SetRelayOutputState( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "SetRelayOutputState", input, null, "tds", "SetRelayOutputStateResponse", output, null);
    },
    SendAuxiliaryCommand( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "SendAuxiliaryCommand", input, null, "tds", "SendAuxiliaryCommandResponse", output, null);
    },
    GetCACertificates( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "GetCACertificates", input, null, "tds", "GetCACertificatesResponse", output, null);
    },
    LoadCertificateWithPrivateKey( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "LoadCertificateWithPrivateKey", input, null, "tds", "LoadCertificateWithPrivateKeyResponse", output, null);
    },
    GetCertificateInformation( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "GetCertificateInformation", input, null, "tds", "GetCertificateInformationResponse", output, null);
    },
    LoadCACertificates( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "LoadCACertificates", input, null, "tds", "LoadCACertificatesResponse", output, null);
    },
    CreateDot1XConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "CreateDot1XConfiguration", input, null, "tds", "CreateDot1XConfigurationResponse", output, null);
    },
    SetDot1XConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "SetDot1XConfiguration", input, null, "tds", "SetDot1XConfigurationResponse", output, null);
    },
    GetDot1XConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "GetDot1XConfiguration", input, null, "tds", "GetDot1XConfigurationResponse", output, null);
    },
    GetDot1XConfigurations( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "GetDot1XConfigurations", input, null, "tds", "GetDot1XConfigurationsResponse", output, null);
    },
    DeleteDot1XConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "DeleteDot1XConfiguration", input, null, "tds", "DeleteDot1XConfigurationResponse", output, null);
    },
    GetDot11Capabilities( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "GetDot11Capabilities", input, null, "tds", "GetDot11CapabilitiesResponse", output, null);
    },
    GetDot11Status( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "GetDot11Status", input, null, "tds", "GetDot11StatusResponse", output, null);
    },
    ScanAvailableDot11Networks( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "ScanAvailableDot11Networks", input, null, "tds", "ScanAvailableDot11NetworksResponse", output, null);
    },
    GetSystemUris( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "GetSystemUris", input, null, "tds", "GetSystemUrisResponse", output, null);
    },
    StartFirmwareUpgrade( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "StartFirmwareUpgrade", input, null, "tds", "StartFirmwareUpgradeResponse", output, null);
    },
    StartSystemRestore( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "StartSystemRestore", input, null, "tds", "StartSystemRestoreResponse", output, null);
    },
    GetStorageConfigurations( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "GetStorageConfigurations", input, null, "tds", "GetStorageConfigurationsResponse", output, null);
    },
    CreateStorageConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "CreateStorageConfiguration", input, null, "tds", "CreateStorageConfigurationResponse", output, null);
    },
    GetStorageConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "GetStorageConfiguration", input, null, "tds", "GetStorageConfigurationResponse", output, null);
    },
    SetStorageConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "SetStorageConfiguration", input, null, "tds", "SetStorageConfigurationResponse", output, null);
    },
    DeleteStorageConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tds", "DeleteStorageConfiguration", input, null, "tds", "DeleteStorageConfigurationResponse", output, null);
    },
};
export const PullPointSubscriptionBinding =
{
    PullMessages( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tev", "PullMessages", input, "http://www.onvif.org/ver10/events/wsdl/PullPointSubscription/PullMessagesRequest", "tev", "PullMessagesResponse", output, "http://www.onvif.org/ver10/events/wsdl/PullPointSubscription/PullMessagesResponse");
    },
    Seek( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tev", "Seek", input, "http://www.onvif.org/ver10/events/wsdl/PullPointSubscription/SeekRequest", "tev", "SeekResponse", output, "http://www.onvif.org/ver10/events/wsdl/PullPointSubscription/SeekResponse");
    },
    SetSynchronizationPoint( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tev", "SetSynchronizationPoint", input, "http://www.onvif.org/ver10/events/wsdl/PullPointSubscription/SetSynchronizationPointRequest", "tev", "SetSynchronizationPointResponse", output, "http://www.onvif.org/ver10/events/wsdl/PullPointSubscription/SetSynchronizationPointResponse");
    },
};
export const EventBinding =
{
    GetServiceCapabilities( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tev", "GetServiceCapabilities", input, "http://www.onvif.org/ver10/events/wsdl/EventPortType/GetServiceCapabilitiesRequest", "tev", "GetServiceCapabilitiesResponse", output, "http://www.onvif.org/ver10/events/wsdl/EventPortType/GetServiceCapabilitiesResponse");
    },
    CreatePullPointSubscription( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tev", "CreatePullPointSubscription", input, "http://www.onvif.org/ver10/events/wsdl/EventPortType/CreatePullPointSubscriptionRequest", "tev", "CreatePullPointSubscriptionResponse", output, "http://www.onvif.org/ver10/events/wsdl/EventPortType/CreatePullPointSubscriptionResponse");
    },
    GetEventProperties( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tev", "GetEventProperties", input, "http://www.onvif.org/ver10/events/wsdl/EventPortType/GetEventPropertiesRequest", "tev", "GetEventPropertiesResponse", output, "http://www.onvif.org/ver10/events/wsdl/EventPortType/GetEventPropertiesResponse");
    },
};
export const SubscriptionManagerBinding =
{
    Renew( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "wsnt", "Renew", input, null, "wsnt", "RenewResponse", output, null);
    },
    Unsubscribe( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "wsnt", "Unsubscribe", input, null, "wsnt", "UnsubscribeResponse", output, null);
    },
};
export const NotificationProducerBinding =
{
    Subscribe( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "wsnt", "Subscribe", input, null, "wsnt", "SubscribeResponse", output, null);
    },
    GetCurrentMessage( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "wsnt", "GetCurrentMessage", input, null, "wsnt", "GetCurrentMessageResponse", output, null);
    },
};
export const NotificationConsumerBinding =
{
    Notify( session, input )
    {
        return ura.onvif_one_way_operation(session, "wsnt", "Notify", input, null);
    },
};
export const PullPointBinding =
{
    GetMessages( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "wsnt", "GetMessages", input, null, "wsnt", "GetMessagesResponse", output, null);
    },
    DestroyPullPoint( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "wsnt", "DestroyPullPoint", input, null, "wsnt", "DestroyPullPointResponse", output, null);
    },
    Notify( session, input )
    {
        return ura.onvif_one_way_operation(session, "wsnt", "Notify", input, null);
    },
};
export const CreatePullPointBinding =
{
    CreatePullPoint( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "wsnt", "CreatePullPoint", input, null, "wsnt", "CreatePullPointResponse", output, null);
    },
};
export const PausableSubscriptionManagerBinding =
{
    Renew( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "wsnt", "Renew", input, null, "wsnt", "RenewResponse", output, null);
    },
    Unsubscribe( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "wsnt", "Unsubscribe", input, null, "wsnt", "UnsubscribeResponse", output, null);
    },
    PauseSubscription( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "wsnt", "PauseSubscription", input, null, "wsnt", "PauseSubscriptionResponse", output, null);
    },
    ResumeSubscription( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "wsnt", "ResumeSubscription", input, null, "wsnt", "ResumeSubscriptionResponse", output, null);
    },
};
export const ImagingBinding =
{
    GetServiceCapabilities( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "timg", "GetServiceCapabilities", input, null, "timg", "GetServiceCapabilitiesResponse", output, null);
    },
    GetImagingSettings( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "timg", "GetImagingSettings", input, null, "timg", "GetImagingSettingsResponse", output, null);
    },
    SetImagingSettings( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "timg", "SetImagingSettings", input, null, "timg", "SetImagingSettingsResponse", output, null);
    },
    GetOptions( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "timg", "GetOptions", input, null, "timg", "GetOptionsResponse", output, null);
    },
    Move( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "timg", "Move", input, null, "timg", "MoveResponse", output, null);
    },
    Stop( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "timg", "Stop", input, null, "timg", "StopResponse", output, null);
    },
    GetStatus( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "timg", "GetStatus", input, null, "timg", "GetStatusResponse", output, null);
    },
    GetMoveOptions( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "timg", "GetMoveOptions", input, null, "timg", "GetMoveOptionsResponse", output, null);
    },
};
export const MediaBinding =
{
    GetServiceCapabilities( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "GetServiceCapabilities", input, null, "trt", "GetServiceCapabilitiesResponse", output, null);
    },
    GetVideoSources( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "GetVideoSources", input, null, "trt", "GetVideoSourcesResponse", output, null);
    },
    GetAudioSources( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "GetAudioSources", input, null, "trt", "GetAudioSourcesResponse", output, null);
    },
    GetAudioOutputs( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "GetAudioOutputs", input, null, "trt", "GetAudioOutputsResponse", output, null);
    },
    CreateProfile( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "CreateProfile", input, null, "trt", "CreateProfileResponse", output, null);
    },
    GetProfile( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "GetProfile", input, null, "trt", "GetProfileResponse", output, null);
    },
    GetProfiles( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "GetProfiles", input, null, "trt", "GetProfilesResponse", output, null);
    },
    AddVideoEncoderConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "AddVideoEncoderConfiguration", input, null, "trt", "AddVideoEncoderConfigurationResponse", output, null);
    },
    AddVideoSourceConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "AddVideoSourceConfiguration", input, null, "trt", "AddVideoSourceConfigurationResponse", output, null);
    },
    AddAudioEncoderConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "AddAudioEncoderConfiguration", input, null, "trt", "AddAudioEncoderConfigurationResponse", output, null);
    },
    AddAudioSourceConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "AddAudioSourceConfiguration", input, null, "trt", "AddAudioSourceConfigurationResponse", output, null);
    },
    AddPTZConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "AddPTZConfiguration", input, null, "trt", "AddPTZConfigurationResponse", output, null);
    },
    AddVideoAnalyticsConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "AddVideoAnalyticsConfiguration", input, null, "trt", "AddVideoAnalyticsConfigurationResponse", output, null);
    },
    AddMetadataConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "AddMetadataConfiguration", input, null, "trt", "AddMetadataConfigurationResponse", output, null);
    },
    AddAudioOutputConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "AddAudioOutputConfiguration", input, null, "trt", "AddAudioOutputConfigurationResponse", output, null);
    },
    AddAudioDecoderConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "AddAudioDecoderConfiguration", input, null, "trt", "AddAudioDecoderConfigurationResponse", output, null);
    },
    RemoveVideoEncoderConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "RemoveVideoEncoderConfiguration", input, null, "trt", "RemoveVideoEncoderConfigurationResponse", output, null);
    },
    RemoveVideoSourceConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "RemoveVideoSourceConfiguration", input, null, "trt", "RemoveVideoSourceConfigurationResponse", output, null);
    },
    RemoveAudioEncoderConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "RemoveAudioEncoderConfiguration", input, null, "trt", "RemoveAudioEncoderConfigurationResponse", output, null);
    },
    RemoveAudioSourceConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "RemoveAudioSourceConfiguration", input, null, "trt", "RemoveAudioSourceConfigurationResponse", output, null);
    },
    RemovePTZConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "RemovePTZConfiguration", input, null, "trt", "RemovePTZConfigurationResponse", output, null);
    },
    RemoveVideoAnalyticsConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "RemoveVideoAnalyticsConfiguration", input, null, "trt", "RemoveVideoAnalyticsConfigurationResponse", output, null);
    },
    RemoveMetadataConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "RemoveMetadataConfiguration", input, null, "trt", "RemoveMetadataConfigurationResponse", output, null);
    },
    RemoveAudioOutputConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "RemoveAudioOutputConfiguration", input, null, "trt", "RemoveAudioOutputConfigurationResponse", output, null);
    },
    RemoveAudioDecoderConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "RemoveAudioDecoderConfiguration", input, null, "trt", "RemoveAudioDecoderConfigurationResponse", output, null);
    },
    DeleteProfile( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "DeleteProfile", input, null, "trt", "DeleteProfileResponse", output, null);
    },
    GetVideoSourceConfigurations( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "GetVideoSourceConfigurations", input, null, "trt", "GetVideoSourceConfigurationsResponse", output, null);
    },
    GetVideoEncoderConfigurations( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "GetVideoEncoderConfigurations", input, null, "trt", "GetVideoEncoderConfigurationsResponse", output, null);
    },
    GetAudioSourceConfigurations( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "GetAudioSourceConfigurations", input, null, "trt", "GetAudioSourceConfigurationsResponse", output, null);
    },
    GetAudioEncoderConfigurations( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "GetAudioEncoderConfigurations", input, null, "trt", "GetAudioEncoderConfigurationsResponse", output, null);
    },
    GetVideoAnalyticsConfigurations( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "GetVideoAnalyticsConfigurations", input, null, "trt", "GetVideoAnalyticsConfigurationsResponse", output, null);
    },
    GetMetadataConfigurations( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "GetMetadataConfigurations", input, null, "trt", "GetMetadataConfigurationsResponse", output, null);
    },
    GetAudioOutputConfigurations( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "GetAudioOutputConfigurations", input, null, "trt", "GetAudioOutputConfigurationsResponse", output, null);
    },
    GetAudioDecoderConfigurations( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "GetAudioDecoderConfigurations", input, null, "trt", "GetAudioDecoderConfigurationsResponse", output, null);
    },
    GetVideoSourceConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "GetVideoSourceConfiguration", input, null, "trt", "GetVideoSourceConfigurationResponse", output, null);
    },
    GetVideoEncoderConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "GetVideoEncoderConfiguration", input, null, "trt", "GetVideoEncoderConfigurationResponse", output, null);
    },
    GetAudioSourceConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "GetAudioSourceConfiguration", input, null, "trt", "GetAudioSourceConfigurationResponse", output, null);
    },
    GetAudioEncoderConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "GetAudioEncoderConfiguration", input, null, "trt", "GetAudioEncoderConfigurationResponse", output, null);
    },
    GetVideoAnalyticsConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "GetVideoAnalyticsConfiguration", input, null, "trt", "GetVideoAnalyticsConfigurationResponse", output, null);
    },
    GetMetadataConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "GetMetadataConfiguration", input, null, "trt", "GetMetadataConfigurationResponse", output, null);
    },
    GetAudioOutputConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "GetAudioOutputConfiguration", input, null, "trt", "GetAudioOutputConfigurationResponse", output, null);
    },
    GetAudioDecoderConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "GetAudioDecoderConfiguration", input, null, "trt", "GetAudioDecoderConfigurationResponse", output, null);
    },
    GetCompatibleVideoEncoderConfigurations( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "GetCompatibleVideoEncoderConfigurations", input, null, "trt", "GetCompatibleVideoEncoderConfigurationsResponse", output, null);
    },
    GetCompatibleVideoSourceConfigurations( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "GetCompatibleVideoSourceConfigurations", input, null, "trt", "GetCompatibleVideoSourceConfigurationsResponse", output, null);
    },
    GetCompatibleAudioEncoderConfigurations( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "GetCompatibleAudioEncoderConfigurations", input, null, "trt", "GetCompatibleAudioEncoderConfigurationsResponse", output, null);
    },
    GetCompatibleAudioSourceConfigurations( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "GetCompatibleAudioSourceConfigurations", input, null, "trt", "GetCompatibleAudioSourceConfigurationsResponse", output, null);
    },
    GetCompatibleVideoAnalyticsConfigurations( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "GetCompatibleVideoAnalyticsConfigurations", input, null, "trt", "GetCompatibleVideoAnalyticsConfigurationsResponse", output, null);
    },
    GetCompatibleMetadataConfigurations( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "GetCompatibleMetadataConfigurations", input, null, "trt", "GetCompatibleMetadataConfigurationsResponse", output, null);
    },
    GetCompatibleAudioOutputConfigurations( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "GetCompatibleAudioOutputConfigurations", input, null, "trt", "GetCompatibleAudioOutputConfigurationsResponse", output, null);
    },
    GetCompatibleAudioDecoderConfigurations( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "GetCompatibleAudioDecoderConfigurations", input, null, "trt", "GetCompatibleAudioDecoderConfigurationsResponse", output, null);
    },
    SetVideoSourceConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "SetVideoSourceConfiguration", input, null, "trt", "SetVideoSourceConfigurationResponse", output, null);
    },
    SetVideoEncoderConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "SetVideoEncoderConfiguration", input, null, "trt", "SetVideoEncoderConfigurationResponse", output, null);
    },
    SetAudioSourceConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "SetAudioSourceConfiguration", input, null, "trt", "SetAudioSourceConfigurationResponse", output, null);
    },
    SetAudioEncoderConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "SetAudioEncoderConfiguration", input, null, "trt", "SetAudioEncoderConfigurationResponse", output, null);
    },
    SetVideoAnalyticsConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "SetVideoAnalyticsConfiguration", input, null, "trt", "SetVideoAnalyticsConfigurationResponse", output, null);
    },
    SetMetadataConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "SetMetadataConfiguration", input, null, "trt", "SetMetadataConfigurationResponse", output, null);
    },
    SetAudioOutputConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "SetAudioOutputConfiguration", input, null, "trt", "SetAudioOutputConfigurationResponse", output, null);
    },
    SetAudioDecoderConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "SetAudioDecoderConfiguration", input, null, "trt", "SetAudioDecoderConfigurationResponse", output, null);
    },
    GetVideoSourceConfigurationOptions( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "GetVideoSourceConfigurationOptions", input, null, "trt", "GetVideoSourceConfigurationOptionsResponse", output, null);
    },
    GetVideoEncoderConfigurationOptions( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "GetVideoEncoderConfigurationOptions", input, null, "trt", "GetVideoEncoderConfigurationOptionsResponse", output, null);
    },
    GetAudioSourceConfigurationOptions( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "GetAudioSourceConfigurationOptions", input, null, "trt", "GetAudioSourceConfigurationOptionsResponse", output, null);
    },
    GetAudioEncoderConfigurationOptions( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "GetAudioEncoderConfigurationOptions", input, null, "trt", "GetAudioEncoderConfigurationOptionsResponse", output, null);
    },
    GetMetadataConfigurationOptions( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "GetMetadataConfigurationOptions", input, null, "trt", "GetMetadataConfigurationOptionsResponse", output, null);
    },
    GetAudioOutputConfigurationOptions( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "GetAudioOutputConfigurationOptions", input, null, "trt", "GetAudioOutputConfigurationOptionsResponse", output, null);
    },
    GetAudioDecoderConfigurationOptions( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "GetAudioDecoderConfigurationOptions", input, null, "trt", "GetAudioDecoderConfigurationOptionsResponse", output, null);
    },
    GetGuaranteedNumberOfVideoEncoderInstances( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "GetGuaranteedNumberOfVideoEncoderInstances", input, null, "trt", "GetGuaranteedNumberOfVideoEncoderInstancesResponse", output, null);
    },
    GetStreamUri( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "GetStreamUri", input, null, "trt", "GetStreamUriResponse", output, null);
    },
    StartMulticastStreaming( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "StartMulticastStreaming", input, null, "trt", "StartMulticastStreamingResponse", output, null);
    },
    StopMulticastStreaming( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "StopMulticastStreaming", input, null, "trt", "StopMulticastStreamingResponse", output, null);
    },
    SetSynchronizationPoint( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "SetSynchronizationPoint", input, null, "trt", "SetSynchronizationPointResponse", output, null);
    },
    GetSnapshotUri( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "GetSnapshotUri", input, null, "trt", "GetSnapshotUriResponse", output, null);
    },
    GetVideoSourceModes( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "GetVideoSourceModes", input, null, "trt", "GetVideoSourceModesResponse", output, null);
    },
    SetVideoSourceMode( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "SetVideoSourceMode", input, null, "trt", "SetVideoSourceModeResponse", output, null);
    },
    GetOSDs( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "GetOSDs", input, null, "trt", "GetOSDsResponse", output, null);
    },
    GetOSD( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "GetOSD", input, null, "trt", "GetOSDResponse", output, null);
    },
    GetOSDOptions( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "GetOSDOptions", input, null, "trt", "GetOSDOptionsResponse", output, null);
    },
    SetOSD( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "SetOSD", input, null, "trt", "SetOSDResponse", output, null);
    },
    CreateOSD( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "CreateOSD", input, null, "trt", "CreateOSDResponse", output, null);
    },
    DeleteOSD( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "trt", "DeleteOSD", input, null, "trt", "DeleteOSDResponse", output, null);
    },
};
export const Media2Binding =
{
    GetServiceCapabilities( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tr2", "GetServiceCapabilities", input, null, "tr2", "GetServiceCapabilitiesResponse2", output, null);
    },
    CreateProfile( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tr2", "CreateProfile", input, null, "tr2", "CreateProfileResponse", output, null);
    },
    GetProfiles( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tr2", "GetProfiles", input, null, "tr2", "GetProfilesResponse", output, null);
    },
    AddConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tr2", "AddConfiguration", input, null, "tr2", "AddConfigurationResponse", output, null);
    },
    RemoveConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tr2", "RemoveConfiguration", input, null, "tr2", "RemoveConfigurationResponse", output, null);
    },
    DeleteProfile( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tr2", "DeleteProfile", input, null, "tr2", "DeleteProfileResponse", output, null);
    },
    GetVideoSourceConfigurations( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tr2", "GetVideoSourceConfigurations", input, null, "tr2", "GetVideoSourceConfigurationsResponse", output, null);
    },
    GetVideoEncoderConfigurations( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tr2", "GetVideoEncoderConfigurations", input, null, "tr2", "GetVideoEncoderConfigurationsResponse", output, null);
    },
    GetAudioSourceConfigurations( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tr2", "GetAudioSourceConfigurations", input, null, "tr2", "GetAudioSourceConfigurationsResponse", output, null);
    },
    GetAudioEncoderConfigurations( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tr2", "GetAudioEncoderConfigurations", input, null, "tr2", "GetAudioEncoderConfigurationsResponse", output, null);
    },
    GetAnalyticsConfigurations( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tr2", "GetAnalyticsConfigurations", input, null, "tr2", "GetAnalyticsConfigurationsResponse", output, null);
    },
    GetMetadataConfigurations( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tr2", "GetMetadataConfigurations", input, null, "tr2", "GetMetadataConfigurationsResponse", output, null);
    },
    GetAudioOutputConfigurations( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tr2", "GetAudioOutputConfigurations", input, null, "tr2", "GetAudioOutputConfigurationsResponse", output, null);
    },
    GetAudioDecoderConfigurations( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tr2", "GetAudioDecoderConfigurations", input, null, "tr2", "GetAudioDecoderConfigurationsResponse", output, null);
    },
    SetVideoSourceConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tr2", "SetVideoSourceConfiguration", input, null, "tr2", "SetConfigurationResponse", output, null);
    },
    SetVideoEncoderConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tr2", "SetVideoEncoderConfiguration", input, null, "tr2", "SetConfigurationResponse", output, null);
    },
    SetAudioSourceConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tr2", "SetAudioSourceConfiguration", input, null, "tr2", "SetConfigurationResponse", output, null);
    },
    SetAudioEncoderConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tr2", "SetAudioEncoderConfiguration", input, null, "tr2", "SetConfigurationResponse", output, null);
    },
    SetMetadataConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tr2", "SetMetadataConfiguration", input, null, "tr2", "SetConfigurationResponse", output, null);
    },
    SetAudioOutputConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tr2", "SetAudioOutputConfiguration", input, null, "tr2", "SetConfigurationResponse", output, null);
    },
    SetAudioDecoderConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tr2", "SetAudioDecoderConfiguration", input, null, "tr2", "SetConfigurationResponse", output, null);
    },
    GetVideoSourceConfigurationOptions( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tr2", "GetVideoSourceConfigurationOptions", input, null, "tr2", "GetVideoSourceConfigurationOptionsResponse", output, null);
    },
    GetVideoEncoderConfigurationOptions( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tr2", "GetVideoEncoderConfigurationOptions", input, null, "tr2", "GetVideoEncoderConfigurationOptionsResponse", output, null);
    },
    GetAudioSourceConfigurationOptions( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tr2", "GetAudioSourceConfigurationOptions", input, null, "tr2", "GetAudioSourceConfigurationOptionsResponse", output, null);
    },
    GetAudioEncoderConfigurationOptions( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tr2", "GetAudioEncoderConfigurationOptions", input, null, "tr2", "GetAudioEncoderConfigurationOptionsResponse", output, null);
    },
    GetMetadataConfigurationOptions( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tr2", "GetMetadataConfigurationOptions", input, null, "tr2", "GetMetadataConfigurationOptionsResponse", output, null);
    },
    GetAudioOutputConfigurationOptions( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tr2", "GetAudioOutputConfigurationOptions", input, null, "tr2", "GetAudioOutputConfigurationOptionsResponse", output, null);
    },
    GetAudioDecoderConfigurationOptions( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tr2", "GetAudioDecoderConfigurationOptions", input, null, "tr2", "GetAudioDecoderConfigurationOptionsResponse", output, null);
    },
    GetVideoEncoderInstances( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tr2", "GetVideoEncoderInstances", input, null, "tr2", "GetVideoEncoderInstancesResponse", output, null);
    },
    GetStreamUri( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tr2", "GetStreamUri", input, null, "tr2", "GetStreamUriResponse", output, null);
    },
    StartMulticastStreaming( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tr2", "StartMulticastStreaming", input, null, "tr2", "StartStopMulticastStreamingResponse", output, null);
    },
    StopMulticastStreaming( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tr2", "StopMulticastStreaming", input, null, "tr2", "StartStopMulticastStreamingResponse", output, null);
    },
    SetSynchronizationPoint( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tr2", "SetSynchronizationPoint", input, null, "tr2", "SetSynchronizationPointResponse", output, null);
    },
    GetSnapshotUri( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tr2", "GetSnapshotUri", input, null, "tr2", "GetSnapshotUriResponse", output, null);
    },
    GetVideoSourceModes( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tr2", "GetVideoSourceModes", input, null, "tr2", "GetVideoSourceModesResponse", output, null);
    },
    SetVideoSourceMode( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tr2", "SetVideoSourceMode", input, null, "tr2", "SetVideoSourceModeResponse", output, null);
    },
    GetOSDs( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tr2", "GetOSDs", input, null, "tr2", "GetOSDsResponse", output, null);
    },
    GetOSDOptions( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tr2", "GetOSDOptions", input, null, "tr2", "GetOSDOptionsResponse", output, null);
    },
    SetOSD( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tr2", "SetOSD", input, null, "tr2", "SetConfigurationResponse", output, null);
    },
    CreateOSD( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tr2", "CreateOSD", input, null, "tr2", "CreateOSDResponse", output, null);
    },
    DeleteOSD( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tr2", "DeleteOSD", input, null, "tr2", "SetConfigurationResponse", output, null);
    },
};
export const PTZBinding =
{
    GetServiceCapabilities( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tptz", "GetServiceCapabilities", input, null, "tptz", "GetServiceCapabilitiesResponse", output, null);
    },
    GetConfigurations( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tptz", "GetConfigurations", input, null, "tptz", "GetConfigurationsResponse", output, null);
    },
    GetPresets( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tptz", "GetPresets", input, null, "tptz", "GetPresetsResponse", output, null);
    },
    SetPreset( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tptz", "SetPreset", input, null, "tptz", "SetPresetResponse", output, null);
    },
    RemovePreset( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tptz", "RemovePreset", input, null, "tptz", "RemovePresetResponse", output, null);
    },
    GotoPreset( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tptz", "GotoPreset", input, null, "tptz", "GotoPresetResponse", output, null);
    },
    GetStatus( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tptz", "GetStatus", input, null, "tptz", "GetStatusResponse", output, null);
    },
    GetConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tptz", "GetConfiguration", input, null, "tptz", "GetConfigurationResponse", output, null);
    },
    GetNodes( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tptz", "GetNodes", input, null, "tptz", "GetNodesResponse", output, null);
    },
    GetNode( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tptz", "GetNode", input, null, "tptz", "GetNodeResponse", output, null);
    },
    SetConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tptz", "SetConfiguration", input, null, "tptz", "SetConfigurationResponse", output, null);
    },
    GetConfigurationOptions( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tptz", "GetConfigurationOptions", input, null, "tptz", "GetConfigurationOptionsResponse", output, null);
    },
    GotoHomePosition( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tptz", "GotoHomePosition", input, null, "tptz", "GotoHomePositionResponse", output, null);
    },
    SetHomePosition( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tptz", "SetHomePosition", input, null, "tptz", "SetHomePositionResponse", output, null);
    },
    ContinuousMove( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tptz", "ContinuousMove", input, null, "tptz", "ContinuousMoveResponse", output, null);
    },
    RelativeMove( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tptz", "RelativeMove", input, null, "tptz", "RelativeMoveResponse", output, null);
    },
    SendAuxiliaryCommand( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tptz", "SendAuxiliaryCommand", input, null, "tptz", "SendAuxiliaryCommandResponse", output, null);
    },
    AbsoluteMove( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tptz", "AbsoluteMove", input, null, "tptz", "AbsoluteMoveResponse", output, null);
    },
    Stop( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tptz", "Stop", input, null, "tptz", "StopResponse", output, null);
    },
    GetPresetTours( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tptz", "GetPresetTours", input, null, "tptz", "GetPresetToursResponse", output, null);
    },
    GetPresetTour( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tptz", "GetPresetTour", input, null, "tptz", "GetPresetTourResponse", output, null);
    },
    GetPresetTourOptions( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tptz", "GetPresetTourOptions", input, null, "tptz", "GetPresetTourOptionsResponse", output, null);
    },
    CreatePresetTour( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tptz", "CreatePresetTour", input, null, "tptz", "CreatePresetTourResponse", output, null);
    },
    ModifyPresetTour( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tptz", "ModifyPresetTour", input, null, "tptz", "ModifyPresetTourResponse", output, null);
    },
    OperatePresetTour( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tptz", "OperatePresetTour", input, null, "tptz", "OperatePresetTourResponse", output, null);
    },
    RemovePresetTour( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tptz", "RemovePresetTour", input, null, "tptz", "RemovePresetTourResponse", output, null);
    },
    GetCompatibleConfigurations( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tptz", "GetCompatibleConfigurations", input, null, "tptz", "GetCompatibleConfigurationsResponse", output, null);
    },
};
export const ThermalBinding =
{
    GetServiceCapabilities( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tth", "GetServiceCapabilities", input, null, "tth", "GetServiceCapabilitiesResponse", output, null);
    },
    GetConfigurationOptions( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tth", "GetConfigurationOptions", input, null, "tth", "GetConfigurationOptionsResponse", output, null);
    },
    GetConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tth", "GetConfiguration", input, null, "tth", "GetConfigurationResponse", output, null);
    },
    SetConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tth", "SetConfiguration", input, null, "tth", "SetConfigurationResponse", output, null);
    },
};
export const RuleEngineBinding =
{
    GetSupportedRules( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tan", "GetSupportedRules", input, null, "tan", "GetSupportedRulesResponse", output, null);
    },
    CreateRules( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tan", "CreateRules", input, null, "tan", "CreateRulesResponse", output, null);
    },
    DeleteRules( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tan", "DeleteRules", input, null, "tan", "DeleteRulesResponse", output, null);
    },
    GetRules( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tan", "GetRules", input, null, "tan", "GetRulesResponse", output, null);
    },
    ModifyRules( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tan", "ModifyRules", input, null, "tan", "ModifyRulesResponse", output, null);
    },
};
export const AnalyticsEngineBinding =
{
    GetServiceCapabilities( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tan", "GetServiceCapabilities", input, null, "tan", "GetServiceCapabilitiesResponse", output, null);
    },
    GetSupportedAnalyticsModules( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tan", "GetSupportedAnalyticsModules", input, null, "tan", "GetSupportedAnalyticsModulesResponse", output, null);
    },
    CreateAnalyticsModules( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tan", "CreateAnalyticsModules", input, null, "tan", "CreateAnalyticsModulesResponse", output, null);
    },
    DeleteAnalyticsModules( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tan", "DeleteAnalyticsModules", input, null, "tan", "DeleteAnalyticsModulesResponse", output, null);
    },
    GetAnalyticsModules( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tan", "GetAnalyticsModules", input, null, "tan", "GetAnalyticsModulesResponse", output, null);
    },
    ModifyAnalyticsModules( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tan", "ModifyAnalyticsModules", input, null, "tan", "ModifyAnalyticsModulesResponse", output, null);
    },
};
export const AnalyticsDeviceBinding =
{
    GetServiceCapabilities( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tad", "GetServiceCapabilities", input, null, "tad", "GetServiceCapabilitiesResponse", output, null);
    },
    DeleteAnalyticsEngineControl( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tad", "DeleteAnalyticsEngineControl", input, null, "tad", "DeleteAnalyticsEngineControlResponse", output, null);
    },
    CreateAnalyticsEngineControl( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tad", "CreateAnalyticsEngineControl", input, null, "tad", "CreateAnalyticsEngineControlResponse", output, null);
    },
    SetAnalyticsEngineControl( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tad", "SetAnalyticsEngineControl", input, null, "tad", "SetAnalyticsEngineControlResponse", output, null);
    },
    GetAnalyticsEngineControl( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tad", "GetAnalyticsEngineControl", input, null, "tad", "GetAnalyticsEngineControlResponse", output, null);
    },
    GetAnalyticsEngineControls( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tad", "GetAnalyticsEngineControls", input, null, "tad", "GetAnalyticsEngineControlsResponse", output, null);
    },
    GetAnalyticsEngine( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tad", "GetAnalyticsEngine", input, null, "tad", "GetAnalyticsEngineResponse", output, null);
    },
    GetAnalyticsEngines( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tad", "GetAnalyticsEngines", input, null, "tad", "GetAnalyticsEnginesResponse", output, null);
    },
    SetVideoAnalyticsConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tad", "SetVideoAnalyticsConfiguration", input, null, "tad", "SetVideoAnalyticsConfigurationResponse", output, null);
    },
    SetAnalyticsEngineInput( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tad", "SetAnalyticsEngineInput", input, null, "tad", "SetAnalyticsEngineInputResponse", output, null);
    },
    GetAnalyticsEngineInput( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tad", "GetAnalyticsEngineInput", input, null, "tad", "GetAnalyticsEngineInputResponse", output, null);
    },
    GetAnalyticsEngineInputs( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tad", "GetAnalyticsEngineInputs", input, null, "tad", "GetAnalyticsEngineInputsResponse", output, null);
    },
    GetAnalyticsDeviceStreamUri( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tad", "GetAnalyticsDeviceStreamUri", input, null, "tad", "GetAnalyticsDeviceStreamUriResponse", output, null);
    },
    GetVideoAnalyticsConfiguration( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tad", "GetVideoAnalyticsConfiguration", input, null, "tad", "GetVideoAnalyticsConfigurationResponse", output, null);
    },
    CreateAnalyticsEngineInputs( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tad", "CreateAnalyticsEngineInputs", input, null, "tad", "CreateAnalyticsEngineInputsResponse", output, null);
    },
    DeleteAnalyticsEngineInputs( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tad", "DeleteAnalyticsEngineInputs", input, null, "tad", "DeleteAnalyticsEngineInputsResponse", output, null);
    },
    GetAnalyticsState( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tad", "GetAnalyticsState", input, null, "tad", "GetAnalyticsStateResponse", output, null);
    },
};
export const ActionEngineBinding =
{
    GetSupportedActions( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tae", "GetSupportedActions", input, null, "tae", "GetSupportedActionsResponse", output, null);
    },
    GetActions( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tae", "GetActions", input, null, "tae", "GetActionsResponse", output, null);
    },
    CreateActions( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tae", "CreateActions", input, null, "tae", "CreateActionsResponse", output, null);
    },
    DeleteActions( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tae", "DeleteActions", input, null, "tae", "DeleteActionsResponse", output, null);
    },
    ModifyActions( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tae", "ModifyActions", input, null, "tae", "ModifyActionsResponse", output, null);
    },
    GetServiceCapabilities( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tae", "GetServiceCapabilities", input, null, "tae", "GetServiceCapabilitiesResponse", output, null);
    },
    GetActionTriggers( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tae", "GetActionTriggers", input, null, "tae", "GetActionTriggersResponse", output, null);
    },
    CreateActionTriggers( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tae", "CreateActionTriggers", input, null, "tae", "CreateActionTriggersResponse", output, null);
    },
    DeleteActionTriggers( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tae", "DeleteActionTriggers", input, null, "tae", "DeleteActionTriggersResponse", output, null);
    },
    ModifyActionTriggers( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tae", "ModifyActionTriggers", input, null, "tae", "ModifyActionTriggersResponse", output, null);
    },
};
export const ScheduleBinding =
{
    GetServiceCapabilities( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tsc", "GetServiceCapabilities", input, null, "tsc", "GetServiceCapabilitiesResponse", output, null);
    },
    GetScheduleState( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tsc", "GetScheduleState", input, null, "tsc", "GetScheduleStateResponse", output, null);
    },
    GetScheduleInfo( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tsc", "GetScheduleInfo", input, null, "tsc", "GetScheduleInfoResponse", output, null);
    },
    GetScheduleInfoList( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tsc", "GetScheduleInfoList", input, null, "tsc", "GetScheduleInfoListResponse", output, null);
    },
    GetSchedules( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tsc", "GetSchedules", input, null, "tsc", "GetSchedulesResponse", output, null);
    },
    GetScheduleList( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tsc", "GetScheduleList", input, null, "tsc", "GetScheduleListResponse", output, null);
    },
    CreateSchedule( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tsc", "CreateSchedule", input, null, "tsc", "CreateScheduleResponse", output, null);
    },
    ModifySchedule( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tsc", "ModifySchedule", input, null, "tsc", "ModifyScheduleResponse", output, null);
    },
    DeleteSchedule( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tsc", "DeleteSchedule", input, null, "tsc", "DeleteScheduleResponse", output, null);
    },
    GetSpecialDayGroupInfo( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tsc", "GetSpecialDayGroupInfo", input, null, "tsc", "GetSpecialDayGroupInfoResponse", output, null);
    },
    GetSpecialDayGroupInfoList( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tsc", "GetSpecialDayGroupInfoList", input, null, "tsc", "GetSpecialDayGroupInfoListResponse", output, null);
    },
    GetSpecialDayGroups( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tsc", "GetSpecialDayGroups", input, null, "tsc", "GetSpecialDayGroupsResponse", output, null);
    },
    GetSpecialDayGroupList( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tsc", "GetSpecialDayGroupList", input, null, "tsc", "GetSpecialDayGroupListResponse", output, null);
    },
    CreateSpecialDayGroup( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tsc", "CreateSpecialDayGroup", input, null, "tsc", "CreateSpecialDayGroupResponse", output, null);
    },
    ModifySpecialDayGroup( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tsc", "ModifySpecialDayGroup", input, null, "tsc", "ModifySpecialDayGroupResponse", output, null);
    },
    DeleteSpecialDayGroup( session, input, output )
    {
        return ura.onvif_request_response_operation(session, "tsc", "DeleteSpecialDayGroup", input, null, "tsc", "DeleteSpecialDayGroupResponse", output, null);
    },
};

