interface YelpBusinessCooodinates {
    latitude: number;
    longitude: number;
}

interface YelpBusCategory {
    alias: string;
    title: string;
}

interface YelpBusAddress {
    address1: string;
    address2: string;
    address3: string;
    city: string;
    country: string;
    display_address: Array<string>;
    state: string;
    zip_code: string;
}

export interface YelpBusiness {
    alias: string
    categories: Array<YelpBusCategory>;
    coordinates: YelpBusinessCooodinates;
    display_phone: string;
    distance: number;
    id: string;
    image_url: string;
    is_closed: boolean;
    location: YelpBusAddress;
    name: string;
    phone: string;
    price: string;
    rating: number
    review_count: Number;
    transactions: Array<string>;
    url: string;
}