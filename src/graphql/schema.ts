import { gql } from 'graphql-tag';
export const typeDefs = gql`
  type Note {
    id: Int!
    title: String!
    body: String!
    createdAt: String!
  }

  type Query {
    notes: [Note!]!
    note(id: Int!): Note!
  }

  type Mutation {
    addNote(note: AddNoteInput!): Note
    deleteNote(id: Int!): Boolean!
  }

  input AddNoteInput {
    title: String!
    body: String!
  }
`;
