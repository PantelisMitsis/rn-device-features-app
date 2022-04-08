const GOOGLE_API_KEY = 'subscribe and create an api key from google maps api';

export function getMapPreview({lat, lng}){
  const imagePreviewUrl =`take it google maps api page, also change it ${lat},${lng} and add your api key${GOOGLE_API_KEY}`;

  return imagePreviewUrl;
}


export async function getAddress(lat, lng) {
  const url = `take the url from the geocode google api and add your API key`;
  const response = await fetch(url);

  if (!response.ok){
    throw new Error ('Falied to fetch address!');
  }

  const data = await response.json();
  const address = data.results[0]. formatted_address;
  return address;
}