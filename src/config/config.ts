export let Config = {
    APIG_REGION:"ca-central-1",
    REGION:"us-east-1",
    IDENTITY_POOL_ID:"us-east-1:8d9eb838-0381-4d82-a4eb-1be28bace6e0",
    USER_POOL_ID:"us-east-1_T6R0ovZgr",
    CLIENT_ID:"3n9tckl52cofj0814csl4pv6u8",
    MOBILE_ANALYTICS_APP_ID:"8ed115bcfac94dfa8e364aa5ef201849"
}

export let _POOL_DATA = {
    UserPoolId: Config["USER_POOL_ID"],
    ClientId: Config["CLIENT_ID"]
}

export let BEACON_CONFIG = {
    BeaconRegion:{
        identifier: "paws",
        uuid: "D0D3FA86-CA76-45EC-9BD9-6AF4BEAC8EDA",
        major: "",
        minor: "",
        notifyEntryStateOnDisplay: true
    }
}