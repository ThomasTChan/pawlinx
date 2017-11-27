export interface Paw {
    accountId?: String;
    beaconId?: String;
    pawId?: String;
    name: string;
    type: string;    
    picture: string;
    owner: Owner;
    weight: number | string;
    dob: string;
    colour: string;
    sex?: string;
    favouriteFood?: string;
    hobbies?: Array<string>;    
    tag?: Tag;
    temperature?: number | string;
}

export interface Owner {
    accountId?: String;
    beaconIds?: Array<string>;
    ownerId?: String;
    name: string;
    dob?: string;
    sex?: string;
    picture: string;
    occuption?: string;
    location?: Location;
    contact?: Contact;
}

export interface Location {
    address1: string;
    address2: string;
    city: string;
    province: string;
    postalCode: string;    
}

export interface Contact {
    tel: string;
    email: string;
}

export interface Tag {
    tagId: string;
    institution: string;
}
