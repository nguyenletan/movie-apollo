const { RESTDataSource } = require("apollo-datasource-rest");

const API_KEY= "c95c0c94956c14554a93f964797eb249";
class TMDB extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.themoviedb.org/3";
  }

  async discover(sort_by = "popularity.desc") {
    //console.log(name);
    // console.log(pokemon);
    return await this.get(
      `/discover/movie?sort_by=${sort_by}&api_key=${API_KEY}`
    );
  }
  
  async getMovieDetail(id, language = "vi") {
    return await this.get(
      `/movie/${id}?language=${language}&api_key=${API_KEY}`
    );
  }
  
  async getTvShowDetail(id, language = "vi") {
    return await this.get(
      `/tv/${id}?language=${language}&api_key=${API_KEY}`
    );
  }
  
  async discoverMovies(sort_by = "popularity.desc", language = "vi", page = 1) {
    return await this.get(
      `/discover/movie?sort_by=${sort_by}&language=${language}&page=${page}&api_key=${API_KEY}`
    );
  }
  
  async discoverTVShows(sort_by = "popularity.desc", language = "vi", page = 1) {
    return await this.get(
      `/discover/tv?sort_by=${sort_by}&language=${language}&page=${page}&api_key=${API_KEY}`
    );
  }
}

module.exports = TMDB;
