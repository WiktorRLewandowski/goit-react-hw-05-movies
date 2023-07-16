import axios from "axios"

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const KEY = '79ea8908d5d0aaabd49d601dd35d503a';
const LANG = 'en-US';
const SEARCH_URL = 'search/movie';
const TRENDING_URL = `trending/movie/week`;

export const fetchTrending = async () => {
  const response = await axios.get(`${TRENDING_URL}`, {
    params: {
      api_key: KEY,
      language: LANG,
      include_adult: false,
    },
  });
  return response.data.results
}

export const fetchSearch = async (query, page) => {
  const response = await axios.get(`${SEARCH_URL}`, {
    params: {
      query: query,
      api_key: KEY,
      language: LANG,
      include_adult: false,
      page: page,
    },
  })
  return response.data
}

export const fetchById = async (id, fetchCategory) => {
  switch (fetchCategory) {      
    case 'credits':
      fetchCategory = `/credits`
      break;
    case 'reviews':
      fetchCategory = `/reviews`
      break;
    default:
      fetchCategory = '';
  }
  const response = await axios.get(`/movie/${id}${fetchCategory}`, {
    params: {
      api_key: KEY,
      language: LANG,
      include_adult: false,
    },
  })
  return response.data
}