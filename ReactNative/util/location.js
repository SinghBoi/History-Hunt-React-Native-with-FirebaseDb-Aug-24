const GOOGLE_API_KEY = "AIzaSyBg2p_vbICXSaXAkOiI6Rh4V3yIaWirXdM"

export const createLocationUrl = (lat, lng) => {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${ lat },${ lng },&zoom=14&size=600x300&maptype=roadmap&markers=color:red%7Clabel:S%7C${ lat },${ lng }&key=${ GOOGLE_API_KEY }`
}