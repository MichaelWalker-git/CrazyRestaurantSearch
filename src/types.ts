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
  price?: string;
  rating: number;
  review_count: Number;
  transactions: Array<string>;
  url: string;
}

export interface GoogleAutoCompletePrediction {
  description: string;
  place_id: string;
  reference: string;
}

export interface GoogleBusiness {
  business_status: string;
  geometry: { location: { lat: number, lng: number } }
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  name: string;
  opening_hours: { open_now: boolean }
  photos: Array<GoogleBusinessPhotos>
  place_id: string;
  plus_code: { compound_code: string, global_code: string }
  price_level: number;
  rating: number;
  reference: string;
  scope: string;
  types: Array<string>
  user_ratings_total: number;
  url?: string;
  vicinity: string;
  website?: string;
}

export interface GoogleNearByResponse {
  results: Array<GoogleBusiness>;
  status: string;
}

export interface YelpBusinessSearchResponse {
  businesses: Array<YelpBusiness>,
  total: number,
}

export type PromiseAllGetAllYelpAndGoogleResults = [YelpBusinessSearchResponse,GoogleNearByResponse];

interface GoogleBusinessPhotos {
  height: number;
  html_attributions: Array<string>;
  photo_reference: string;
  width: number;
}

export type JoinedYelpGoogleData = Map<string, Array<YelpBusiness|GoogleBusiness>>;

export type UnMatchedYelpMap = Map<string, Array<YelpBusiness>>;

export interface JoinedDataAndUnMatchedData {
  joinedDataMap: JoinedYelpGoogleData;
  unMatchedMap: UnMatchedYelpMap;
}

export interface PredictionResponse {
  description: string,
  matched_substrings: Array<PredictionString>
  place_id: string,
  reference: string,
  terms: Array<PredictionString>,
  structured_formatting: {
    main_text: string,
    main_text_matched_substring: Array<PredictionString>
  },
  types: Array<string>,
}

interface PredictionString {length: number, offset: number}
