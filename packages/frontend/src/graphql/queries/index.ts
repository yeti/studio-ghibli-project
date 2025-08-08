import { gql } from '~/graphql/gen';

export const GET_HELLO_WORLD = gql(`
  query GetHelloWorld {
    helloWorld {
      message
    }
  }
`);

// Export film queries
export * from './films';
