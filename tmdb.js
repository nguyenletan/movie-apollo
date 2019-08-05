const { RESTDataSource } = require("apollo-datasource-rest");

const API_KEY = "c95c0c94956c14554a93f964797eb249";
class TMDB extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.themoviedb.org/3";
  }

  async discover(sort_by = "popularity.desc") {
    //console.log(name);
    // console.log(pokemon);
    return await this.get(`/discover/movie?sort_by=${sort_by}&api_key=${API_KEY}`);
  }

  async getMovieDetail(id, language = "vi") {
    return await this.get(`/movie/${id}?language=${language}&api_key=${API_KEY}`);
  }

  async getTvShowDetail(id, language = "vi") {
    return await this.get(`/tv/${id}?language=${language}&api_key=${API_KEY}`);
  }

  async discoverMovies(sort_by = "popularity.desc", language = "vi", page = 1) {
    const currentDate = new Date();
    const maxDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 2}-01`;
    const minDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-01`;
    return await this.get(`/discover/movie?
    sort_by=${sort_by}&primary_release_date.gte=${minDate}&primary_release_date.lte=${maxDate}
    &language=${language}
    &page=${page}
    &api_key=${API_KEY}`);
  }

  async discoverTVShows(sort_by = "popularity.desc", language = "vi", page = 1) {
    return await this.get(`/discover/tv?sort_by=${sort_by}&language=${language}&page=${page}&api_key=${API_KEY}`);
  }

  // Get the videos that have been added to a movie.
  async getTrailers(movie_id) {
    return await this.get(`/movie/${movie_id}/videos?&api_key=${API_KEY}`);
  }

  async getUpcommingMovies(page = 1) {
    return await this.get(`/movie/now_playing?page=${page}&api_key=${API_KEY}`);
  }
}

module.exports = TMDB;
