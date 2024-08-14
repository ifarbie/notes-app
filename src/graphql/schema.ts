import { gql } from '@apollo/client';
export const typeDefs = gql`
  type Note {
    id: String!
    title: String!
    body: String!
    createdAt: String!
  }

  type Query {
    notes: [Note!]!
    note(id: String!): Note!
  }

  type Mutation {
    addNote(note: NoteInput!): Note
    deleteNote(id: String!): Boolean!
    updateNote(id: String!, note: NoteInput!): Note!
  }

  input NoteInput {
    title: String!
    body: String!
  }
`;
