const axios = require('axios').default;

const API_KEY = '24406389-80d19f3f64d36bf4e48f43e71';
const BASE_URL = 'https://pixabay.com/api/';

async function fetchImages(name, page) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${name}&image_type=photo&page=${page}&per_page=12`;

  const images = await axios.get(url);

  return images.data;
}

export default fetchImages;
