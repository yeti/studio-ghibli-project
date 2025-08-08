import { stringArg, nonNull, extendType } from 'nexus';
import { HelloWorld, Film } from './objectTypes.ghibliSchema';
import { GraphQLError } from 'graphql';
import { GQL_ERROR_CODES, ErrorMessages } from '~/shared/constants';
import { getHelloWorld } from '~/shared/utils';
import { GhibliService } from '~/services/Ghibli/Ghibli.service';

export const TourQueries = extendType({
  type: 'Query',
  definition(t) {
    t.field('helloWorld', {
      type: nonNull(HelloWorld),
      resolve: async () => {
        try {
          const helloWorld = getHelloWorld();
          return helloWorld;
        } catch (error) {
          // Re-throw GraphQL errors as-is for proper client handling
          if (error instanceof GraphQLError) {
            throw error;
          }

          // Throw a generic error for unexpected errors
          throw new GraphQLError(ErrorMessages.ServerError, {
            extensions: { code: GQL_ERROR_CODES.SERVER_ERROR },
          });
        }
      },
    });
  },
});

export const FilmQueries = extendType({
  type: 'Query',
  definition(t) {
    t.field('film', {
      type: Film,
      args: {
        id: nonNull(stringArg()),
      },
      resolve: async (_, { id }) => {
        try {
          const ghibliService = new GhibliService();
          const film = await ghibliService.getFilm(id);
          return film;
        } catch (error: any) {
          if (error instanceof GraphQLError) {
            throw error;
          }

          // Handle specific API errors
          if (error.message?.includes('not found')) {
            throw new GraphQLError(`Film with ID ${id} not found`, {
              extensions: { code: 'NOT_FOUND' },
            });
          }
          if (error.message?.includes('unavailable')) {
            throw new GraphQLError(
              'Studio Ghibli API is currently unavailable',
              {
                extensions: { code: 'SERVICE_UNAVAILABLE' },
              },
            );
          }
          if (error.message?.includes('Unable to connect')) {
            throw new GraphQLError('Unable to connect to Studio Ghibli API', {
              extensions: { code: 'CONNECTION_ERROR' },
            });
          }

          throw new GraphQLError(ErrorMessages.ServerError, {
            extensions: { code: GQL_ERROR_CODES.SERVER_ERROR },
          });
        }
      },
    });

    t.list.field('films', {
      type: nonNull(Film),
      resolve: async () => {
        try {
          const ghibliService = new GhibliService();
          const films = await ghibliService.getAllFilms();
          return films;
        } catch (error: any) {
          if (error instanceof GraphQLError) {
            throw error;
          }

          // Handle specific API errors
          if (error.message?.includes('unavailable')) {
            throw new GraphQLError(
              'Studio Ghibli API is currently unavailable',
              {
                extensions: { code: 'SERVICE_UNAVAILABLE' },
              },
            );
          }
          if (error.message?.includes('Unable to connect')) {
            throw new GraphQLError('Unable to connect to Studio Ghibli API', {
              extensions: { code: 'CONNECTION_ERROR' },
            });
          }

          throw new GraphQLError(ErrorMessages.ServerError, {
            extensions: { code: GQL_ERROR_CODES.SERVER_ERROR },
          });
        }
      },
    });
  },
});
