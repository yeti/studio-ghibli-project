import { gql } from '~/graphql/gen';

export const GET_FILM = gql(`
  query GetFilm($id: String!) {
    film(id: $id) {
      id
      title
      original_title
      original_title_romanised
      description
      director
      producer
      release_date
      running_time
      rt_score
      people
      species
      locations
      vehicles
      url
    }
  }
`);

export const GET_ALL_FILMS = gql(`
  query GetAllFilms {
    films {
      id
      title
      original_title
      original_title_romanised
      description
      director
      producer
      release_date
      running_time
      rt_score
      people
      species
      locations
      vehicles
      url
    }
  }
`);
