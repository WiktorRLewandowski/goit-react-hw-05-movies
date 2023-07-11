import axios from "axios"

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

// const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const KEY = '79ea8908d5d0aaabd49d601dd35d503a';
const LANG = 'en-US';
const SEARCH_URL = 'search/movie';
const TRENDING_URL = `trending/movie/week`;
const GET_MOVIE = '/movies/get-movie-'

export const fetchMovies = async (fetchCategory, query, page) => {
  switch (fetchCategory) {      
    case 'search':
      fetchCategory = SEARCH_URL
      break;
    case 'details':
      fetchCategory = `${GET_MOVIE}details`
      break;
    case 'credits':
      fetchCategory = `${GET_MOVIE}credits`
      break;
    case 'reviews':
      fetchCategory = `${GET_MOVIE}reviews`
      break;
    default:
      fetchCategory = TRENDING_URL;
  }
  const response = await axios.get(`${fetchCategory}`, {
    params: {
      query: query,
      api_key: KEY,
      language: LANG,
      include_adult: false,
      page: page,
    },
  });
  return response.data
}

