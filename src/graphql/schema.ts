import { gql } from '@apollo/client';
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
    addNote(note: NoteInput!): Note
    deleteNote(id: Int!): Boolean!
    updateNote(id: Int!, note: NoteInput!): Note!
  }

  input NoteInput {
    title: String!
    body: String!
  }
`;
