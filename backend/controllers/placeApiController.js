// const axios = require('axios');
// const Location = require('../models/location');

// const getAllByApi = async (request, response) => {
//   const { take = 2, query } = request.query;

//   if (query) {
//     const options = {
//       method: 'GET',
//       url: 'https://local-business-data.p.rapidapi.com/search-nearby',
//       params: {
//         query: 'cafe  (bandung)',
//         lat: '6.9175',
//         lng: '107.6191',
//         limit: take,
//         language: 'id',
//         region: 'id',
//       },
//       headers: {
//         'X-RapidAPI-Key': 'd4d002620cmsh800bf4b76c117ecp1baa3ejsn8bfc762d042b',
//         'X-RapidAPI-Host': 'local-business-data.p.rapidapi.com',
//       },
//     };

//     const publicResponse = await axios.request(options);
//     const places = await publicResponse.data.data;
//     const sendPlacesData = await places.map((place) => ({
//       id: place.place_id,
//       name: place.name,
//       lat: place.latitude,
//       lon: place.longitude,
//       address: place.full_address,
//     }));
//     return response.json(places);
//   }
//   return response.status(400).json({ error: 'must include query' });
// };

// const scrapLocations = async (request, response) => {
//   const { take = 2, query, type } = request.query;
//   if (!type) {
//     return response.status(400).json({ error: 'must include type params' });
//   }
//   if (query) {
//     const options = {
//       method: 'GET',
//       url: 'https://local-business-data.p.rapidapi.com/search',
//       params: {
//         query: `${query}  (bandung)`,
//         lat: '6.9175',
//         lng: '107.6191',
//         limit: take,
//         language: 'id',
//         region: 'id',
//       },
//       headers: {
//         'X-RapidAPI-Key': '',
//         'X-RapidAPI-Host': 'local-business-data.p.rapidapi.com',
//       },
//     };
//     const publicResponse = await axios.request(options);
//     const places = await publicResponse.data.data;
//     const sendPlacesData = await places.map((place) => ({
//       googleId: place.google_id,
//       placeId: place.place_id,
//       phoneNumber: place.phone_number ? place.phone_number : '-',
//       name: place.name,
//       description:
//         place.about && place.about.summary ? place.about.summary : '-',
//       latitude: place.latitude,
//       longitude: place.longitude,
//       address: place.full_address,
//       reviewCount: place.review_count || 0,
//       rating: place.rating || 0,
//       placeLink: place.place_link || '-',
//       reviewsLink: place.reviews_link || '-',
//       type,
//       photo: place.photos_sample ? place.photos_sample[0]?.photo_url : '-',
//     }));
//     await Location.insertMany(sendPlacesData);
//     return response.json(sendPlacesData);
//   }
//   return response.status(400).json({ error: 'must include query' });
// };

// module.exports = { getAllByApi, scrapLocations };
