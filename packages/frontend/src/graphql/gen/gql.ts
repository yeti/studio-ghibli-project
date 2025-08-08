/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  '\n  query GetFilm($id: String!) {\n    film(id: $id) {\n      id\n      title\n      original_title\n      original_title_romanised\n      description\n      director\n      producer\n      release_date\n      running_time\n      rt_score\n      people\n      species\n      locations\n      vehicles\n      url\n    }\n  }\n': typeof types.GetFilmDocument;
  '\n  query GetAllFilms {\n    films {\n      id\n      title\n      original_title\n      original_title_romanised\n      description\n      director\n      producer\n      release_date\n      running_time\n      rt_score\n      people\n      species\n      locations\n      vehicles\n      url\n    }\n  }\n': typeof types.GetAllFilmsDocument;
  '\n  query GetHelloWorld {\n    helloWorld {\n      message\n    }\n  }\n': typeof types.GetHelloWorldDocument;
};
const documents: Documents = {
  '\n  query GetFilm($id: String!) {\n    film(id: $id) {\n      id\n      title\n      original_title\n      original_title_romanised\n      description\n      director\n      producer\n      release_date\n      running_time\n      rt_score\n      people\n      species\n      locations\n      vehicles\n      url\n    }\n  }\n':
    types.GetFilmDocument,
  '\n  query GetAllFilms {\n    films {\n      id\n      title\n      original_title\n      original_title_romanised\n      description\n      director\n      producer\n      release_date\n      running_time\n      rt_score\n      people\n      species\n      locations\n      vehicles\n      url\n    }\n  }\n':
    types.GetAllFilmsDocument,
  '\n  query GetHelloWorld {\n    helloWorld {\n      message\n    }\n  }\n':
    types.GetHelloWorldDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetFilm($id: String!) {\n    film(id: $id) {\n      id\n      title\n      original_title\n      original_title_romanised\n      description\n      director\n      producer\n      release_date\n      running_time\n      rt_score\n      people\n      species\n      locations\n      vehicles\n      url\n    }\n  }\n',
): (typeof documents)['\n  query GetFilm($id: String!) {\n    film(id: $id) {\n      id\n      title\n      original_title\n      original_title_romanised\n      description\n      director\n      producer\n      release_date\n      running_time\n      rt_score\n      people\n      species\n      locations\n      vehicles\n      url\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetAllFilms {\n    films {\n      id\n      title\n      original_title\n      original_title_romanised\n      description\n      director\n      producer\n      release_date\n      running_time\n      rt_score\n      people\n      species\n      locations\n      vehicles\n      url\n    }\n  }\n',
): (typeof documents)['\n  query GetAllFilms {\n    films {\n      id\n      title\n      original_title\n      original_title_romanised\n      description\n      director\n      producer\n      release_date\n      running_time\n      rt_score\n      people\n      species\n      locations\n      vehicles\n      url\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetHelloWorld {\n    helloWorld {\n      message\n    }\n  }\n',
): (typeof documents)['\n  query GetHelloWorld {\n    helloWorld {\n      message\n    }\n  }\n'];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
