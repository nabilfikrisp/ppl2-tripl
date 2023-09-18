const axios = require('axios');

const getAllByApi = async (request, response) => {
  const { take = 2, query } = request.query;

  if (query) {
    const options = {
      method: 'GET',
      url: 'https://local-business-data.p.rapidapi.com/search-nearby',
      params: {
        query: 'cafe  (bandung)',
        lat: '6.9175',
        lng: '107.6191',
        limit: take,
        language: 'id',
        region: 'id',
      },
      headers: {
        'X-RapidAPI-Key': 'd4d002620cmsh800bf4b76c117ecp1baa3ejsn8bfc762d042b',
        'X-RapidAPI-Host': 'local-business-data.p.rapidapi.com',
      },
    };

    const publicResponse = await axios.request(options);
    const places = await publicResponse.data.data;
    const sendPlacesData = await places.map((place) => ({
      id: place.place_id,
      name: place.name,
      lat: place.latitude,
      lon: place.longitude,
      address: place.full_address,
    }));
    return response.json(places);
  }
  return response.status(400).json({ error: 'must include query' });
};

module.exports = { getAllByApi };
