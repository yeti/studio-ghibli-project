/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** Date custom scalar type */
  Date: { input: any; output: any };
};

export type Film = {
  __typename?: 'Film';
  description: Scalars['String']['output'];
  director: Scalars['String']['output'];
  id: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  locations?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  movie_banner?: Maybe<Scalars['String']['output']>;
  original_title?: Maybe<Scalars['String']['output']>;
  original_title_romanised?: Maybe<Scalars['String']['output']>;
  people?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  producer?: Maybe<Scalars['String']['output']>;
  release_date: Scalars['String']['output'];
  rt_score: Scalars['String']['output'];
  running_time: Scalars['String']['output'];
  species?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  title: Scalars['String']['output'];
  url: Scalars['String']['output'];
  vehicles?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type HelloWorld = {
  __typename?: 'HelloWorld';
  message?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  placeholder?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  film?: Maybe<Film>;
  films?: Maybe<Array<Film>>;
  helloWorld: HelloWorld;
  placeholder?: Maybe<Scalars['String']['output']>;
};

export type QueryFilmArgs = {
  id: Scalars['String']['input'];
};

export type GetFilmQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;

export type GetFilmQuery = {
  __typename?: 'Query';
  film?: {
    __typename?: 'Film';
    id: string;
    title: string;
    original_title?: string | null;
    original_title_romanised?: string | null;
    description: string;
    director: string;
    producer?: string | null;
    release_date: string;
    running_time: string;
    rt_score: string;
    people?: Array<string | null> | null;
    species?: Array<string | null> | null;
    locations?: Array<string | null> | null;
    vehicles?: Array<string | null> | null;
    url: string;
  } | null;
};

export type GetAllFilmsQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllFilmsQuery = {
  __typename?: 'Query';
  films?: Array<{
    __typename?: 'Film';
    id: string;
    title: string;
    original_title?: string | null;
    original_title_romanised?: string | null;
    description: string;
    director: string;
    producer?: string | null;
    release_date: string;
    running_time: string;
    rt_score: string;
    people?: Array<string | null> | null;
    species?: Array<string | null> | null;
    locations?: Array<string | null> | null;
    vehicles?: Array<string | null> | null;
    url: string;
  }> | null;
};

export type GetHelloWorldQueryVariables = Exact<{ [key: string]: never }>;

export type GetHelloWorldQuery = {
  __typename?: 'Query';
  helloWorld: { __typename?: 'HelloWorld'; message?: string | null };
};

export const GetFilmDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetFilm' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'film' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'original_title' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'original_title_romanised' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'director' } },
                { kind: 'Field', name: { kind: 'Name', value: 'producer' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'release_date' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'running_time' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'rt_score' } },
                { kind: 'Field', name: { kind: 'Name', value: 'people' } },
                { kind: 'Field', name: { kind: 'Name', value: 'species' } },
                { kind: 'Field', name: { kind: 'Name', value: 'locations' } },
                { kind: 'Field', name: { kind: 'Name', value: 'vehicles' } },
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetFilmQuery, GetFilmQueryVariables>;
export const GetAllFilmsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAllFilms' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'films' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'original_title' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'original_title_romanised' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'director' } },
                { kind: 'Field', name: { kind: 'Name', value: 'producer' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'release_date' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'running_time' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'rt_score' } },
                { kind: 'Field', name: { kind: 'Name', value: 'people' } },
                { kind: 'Field', name: { kind: 'Name', value: 'species' } },
                { kind: 'Field', name: { kind: 'Name', value: 'locations' } },
                { kind: 'Field', name: { kind: 'Name', value: 'vehicles' } },
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetAllFilmsQuery, GetAllFilmsQueryVariables>;
export const GetHelloWorldDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetHelloWorld' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'helloWorld' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'message' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetHelloWorldQuery, GetHelloWorldQueryVariables>;
