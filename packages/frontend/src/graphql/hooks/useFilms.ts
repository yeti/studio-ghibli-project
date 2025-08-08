import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_FILM, GET_ALL_FILMS } from '../queries/films';
import type {
  GetFilmQueryVariables,
  GetFilmQuery,
  GetAllFilmsQuery,
} from '../gen/graphql';

export const useGetFilm = (variables: GetFilmQueryVariables) => {
  return useQuery<GetFilmQuery, GetFilmQueryVariables>(GET_FILM, {
    variables,
    errorPolicy: 'all',
  });
};

export const useLazyGetFilm = () => {
  return useLazyQuery<GetFilmQuery, GetFilmQueryVariables>(GET_FILM, {
    errorPolicy: 'all',
  });
};

export const useGetAllFilms = () => {
  return useQuery<GetAllFilmsQuery>(GET_ALL_FILMS, {
    errorPolicy: 'all',
  });
};

export const useLazyGetAllFilms = () => {
  return useLazyQuery<GetAllFilmsQuery>(GET_ALL_FILMS, {
    errorPolicy: 'all',
  });
};
