import {GoogleBusiness, YelpBusiness} from "./types";

export const yelpTestData: Array<YelpBusiness> = [{
  "id": "cWpnb38gytXaY5Bxr_Kd5g",
  "alias": "nakama-sushi-san-francisco",
  "name": "NAKAMA Sushi",
  "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/28__jEANgM7BXPxT-6Tw3w/o.jpg",
  "is_closed": false,
  "url": "https://www.yelp.com/biz/nakama-sushi-san-francisco?adjust_creative=BLRckseWNtu77GasXb2rpA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=BLRckseWNtu77GasXb2rpA",
  "review_count": 114,
  "categories": [
    {
      "alias": "japanese",
      "title": "Japanese"
    },
    {
      "alias": "sushi",
      "title": "Sushi Bars"
    }
  ],
  "rating": 4.5,
  "coordinates": {
    "latitude": 37.77495,
    "longitude": -122.42107
  },
  "transactions": [
    "delivery"
  ],
  "location": {
    "address1": "41 Franklin St",
    "address2": "",
    "address3": "",
    "city": "San Francisco",
    "zip_code": "94102",
    "country": "US",
    "state": "CA",
    "display_address": [
      "41 Franklin St",
      "San Francisco, CA 94102"
    ]
  },
  "phone": "+16288676697",
  "display_phone": "(628) 867-6697",
  "distance": 144.50463027142422
}];

export const googleData: Array<GoogleBusiness> = [{
  "business_status": "OPERATIONAL",
  "geometry": {
    "location": {
      "lat": 37.7749,
      "lng": -122.4228
    }
  },
  "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
  "icon_background_color": "#FF9E67",
  "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
  "name": "Rich Table",
  "opening_hours": {
    "open_now": false
  },
  "photos": [
    {
      "height": 3024,
      "html_attributions": [
        "<a href=\"https://maps.google.com/maps/contrib/116114972696185408058\">Chris Carini</a>"
      ],
      "photo_reference": "Aap_uECAGHaotLK-lRB80wTfRlbq9f1jJfDtEYGwlutjQ3CuvqwFLzJnsyWQgc5osj6e1nuA1GblMAPKSJtNDD2DU1dP5c1wr-lPWu8YR2GSZmz4XLuTWxdbFhLWVUjOZfXBgr6nmuxJtwwj_8ZRwPFeal_HmIhYgEnnQnyKPqHAlc6GIBfu",
      "width": 4032
    }
  ],
  "place_id": "ChIJh_24QJ-AhYAR_xbUNVN2Xns",
  "plus_code": {
    "compound_code": "QHFG+XV Hayes Valley, San Francisco, CA",
    "global_code": "849VQHFG+XV"
  },
  "price_level": 3,
  "rating": 4.7,
  "reference": "ChIJh_24QJ-AhYAR_xbUNVN2Xns",
  "scope": "GOOGLE",
  "types": [
    "restaurant",
    "food",
    "point_of_interest",
    "establishment"
  ],
  "user_ratings_total": 1100,
  "vicinity": "41 Franklin St, San Francisco"
}];

