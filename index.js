const { ApolloServer, gql } = require("apollo-server");

const TMDB = require("./tmdb");

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const books = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling"
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton"
  }
];

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type Book {
    title: String
    author: String
  }

  # This "Discover_Movie" type can be used in other type declarations.
  type Discover_Movie {
    vote_count: Int
    id: Int
    video: Boolean
    vote_average: Float
    title: String
    popularity: Float
    poster_path: String
    original_language: String
    original_title: String
    genre_ids: [Int]
    backdrop_path: String
    adult: Boolean
    overview: String
    release_date: String,
  }

  # This "Discover_Movies" type can be used in other type declarations.
  type Discover_Movies {
    page: Int
    total_results: Int
    total_pages: Int
    results: [Discover_Movie]
  }

  # This "Discover_TVShow" type can be used in other type declarations.
  type Discover_TVShow {
    original_name: String
    genre_ids: [Int]
    name: String
    popularity: Float
    origin_country: [String]
    vote_count: Int
    first_air_date: String
    backdrop_path: String
    original_language: String
    id: Int
    vote_average: Float
    overview: String
    poster_path: String
  }

  # This "Discover_TVShows" type can be used in other type declarations.
  type Discover_TVShows {
    page: Int
    total_results: Int
    total_pages: Int
    results: [Discover_TVShow]
  }

  # This "GenRes" type can be used in other type declarations.
  type Genre {
    id: Int
    name: String
  }

  # This "ProductionCompany" type can be used in other type declarations.
  type ProductionCompany {
    id: Int
    name: String
    logo_path: String
    origin_country: String
  }

  # This "ProductionCountry" type can be used in other type declarations.
  type ProductionCountry {
    iso_3166_1: String
    name: String
  }

  # This "SpokenLanguage" type can be used in other type declarations.
  type SpokenLanguage {
    iso_639_1: String
    name: String
  }

  # This "Movie" type can be used in other type declarions.
  type Movie {
    adult: Boolean
    backdrop_path: String
    budget: Int
    genres: [Genre]
    homepage: String
    id: Int
    imdb_id: String
    original_language: String
    original_title: String
    overview: String
    popularity: Float
    poster_path: String
    production_companies: [ProductionCompany]
    production_countries: [ProductionCountry]
    release_date: String
    revenue: String
    runtime: Int
    spoken_languages: [SpokenLanguage]
    status: String
    tagline: String
    title: String
    video: Boolean
    vote_average: Float
    vote_count: Int
  }

  # This "EpisodeToAir" type can be used in other type declarions.
  type EpisodeToAir {
    air_date: String
    episode_number: Int
    id: Int
    name: String
    overview: String
    production_code: String
    season_number: Int
    show_id: Int
    still_path: String
    vote_average: Float
    vote_count: Int
  }

  # This "Network" type can be used in other type declarations.
  type Network {
    name: String
    id: Int
    logo_path: String
    origin_country: String
  }

  # This "Season" type can be used in other type declarations.
  type Season {
    air_date: String
    episode_count: Int
    id: Int
    name: String
    overview: String
    poster_path: String
    season_number: Int
  }

  # This "TVShow" type can be used in other type declarations.
  type TVShow {
    backdrop_path: String
    episode_run_time: [Int]
    first_air_date: String
    genres: [Genre]
    homepage: String
    id: Int
    in_production: Boolean
    languages: [String]
    last_air_date: String
    last_episode_to_air: EpisodeToAir
    name: String
    next_episode_to_air: EpisodeToAir
    networks: [Network]
    number_of_episodes: Int
    number_of_seasons: Int
    origin_country: [String]
    original_language: String
    original_name: String
    overview: String
    popularity: Float
    poster_path: String
    production_companies: [ProductionCompany]
    seasons: [Season]
    status: String
    type: String
    vote_average: Float
    vote_count: Int
  }

  type Trailer {
    id: String
    iso_639_1: String
    iso_3166_1: String
    key: String
    name: String
    site: String

    # Allowed Values: 360, 480, 720, 1080
    size: Int

    # Allowed Values: Trailer, Teaser, Clip, Featurette, Behind the Scenes, Bloopers
    type: String
  }

  type TrailerList {
    id: Int
    results: [Trailer]
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    books: [Book]
    discoverMovies(sort_by: String, language: String, page: Int): Discover_Movies
    discoverTVShows(sort_by: String, language: String, page: Int): Discover_TVShows
    getMovieDetail(id: Int, language: String): Movie
    getTVShowDetail(id: Int, language: String): TVShow
    getTrailers(movie_id: Int): TrailerList
    getUpcommingMovies(page: Int): Discover_Movies
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
    discoverMovies: async (_, { sort_by, language, page }, { dataSources }) => dataSources.TMDB.discoverMovies(sort_by, language, page),
    discoverTVShows: async (_, { sort_by, language, page }, { dataSources }) => dataSources.TMDB.discoverTVShows(sort_by, language, page),
    getMovieDetail: async (_, { id, language }, { dataSources }) => dataSources.TMDB.getMovieDetail(id, language),
    getTVShowDetail: async (_, { id, language }, { dataSources }) => dataSources.TMDB.getTvShowDetail(id, language),
    getTrailers: async (_, { movie_id }, { dataSources }) => dataSources.TMDB.getTrailers(movie_id),
    getUpcommingMovies: async (_, { page }, { dataSources }) => dataSources.TMDB.getUpcommingMovies(page)
  }
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({
  cors: true,
  introspection: true,
  playground: true,
  typeDefs,
  resolvers,
  dataSources: () => ({ TMDB: new TMDB() })
});

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
