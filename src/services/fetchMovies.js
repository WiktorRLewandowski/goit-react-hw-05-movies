import axios from "axios"
// import { refs } from "./refs";

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

// const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const KEY = '79ea8908d5d0aaabd49d601dd35d503a';
const LANG = 'en-US';
const SEARCH_URL = 'search/movie';
const TRENDING_URL = `trending/movie/week`;

// params: {
//   query: query,
//   api_key: KEY,
//   language: LANG,
//   include_adult: false,
//   page: page,
// },

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

// 667538 transformers id

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

fetchById(667538)
.then(data => console.log(data))
.catch(error => console.log(error))