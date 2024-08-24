import axios from "axios"
import Geocoder from 'react-native-geocoding';

const GOOGLE_API_KEY = "AIzaSyBg2p_vbICXSaXAkOiI6Rh4V3yIaWirXdM"

Geocoder.init(GOOGLE_API_KEY); 

export const createLocationUrl = (lat, lng) => {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${ lat },${ lng },&zoom=14&size=600x300&maptype=roadmap&markers=color:red%7Clabel:S%7C${ lat },${ lng }&key=${ GOOGLE_API_KEY }`
}

export const getPlaceName = async ({ latitude, longitude }) => {
  try {
    const json = await Geocoder.from(latitude, longitude);
    const placeName = json.results[0].formatted_address;  
    return placeName;
  } catch (error) {
    console.error('Error fetching place name:', error);
    return null;
  }
};

export const getEstimatedTravelTime = async (location, destination) => {

  try {
    if (!location || !destination) {
      throw new Error('Location or destination is undefined');
    }

    const origin = `${location.latitude},${location.longitude}`;
    const dest = `${destination.latitude},${destination.longitude}`;

    const response = await axios.get('https://maps.googleapis.com/maps/api/directions/json', {
      params: {
        origin,
        destination: dest,
        key: GOOGLE_API_KEY,
        units: 'metric'
      }
    });

    // Check if response contains routes
    if (response.data.routes.length > 0) {
      const duration = response.data.routes[0].legs[0].duration.text;
      return duration;
    } else {
      return 'No route found';
    }
  } catch (error) {
    return 'Error fetching travel time';
  }
};
