'use client';

import NotesCard from '@/app/_components/NotesCard';
import { Center, GridItem, SimpleGrid } from '@chakra-ui/react';
import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import AddNoteModal from '@/app/_components/AddNoteModal';
import Note from '@/types/Note';
import Loading from '@/components/Loading';

const AllNotesQuery = gql`
  query {
    notes {
      id
      title
      body
      createdAt
    }
  }
`;

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const { error, loading } = useQuery(AllNotesQuery, {
    onCompleted: (data) => {
      setNotes(() => data.notes);
    },
    fetchPolicy: 'no-cache',
  });
  
  // Penggunaan useEffect untuk mengatur ulang state ketika data berubah
  useEffect(() => {}, [notes]);

  if (loading) return <Loading />
  if (error) return <Center>Error : {error.message}</Center>;
  return (
    <>
      <AddNoteModal setNotes={setNotes} />
      {notes.length ? (
        <SimpleGrid columns={2} gap={6}>
          {notes.map((note: Note) => (
            <GridItem key={note.id}>
              <NotesCard id={note.id} title={note.title} body={note.body} createdAt={note.createdAt} />
            </GridItem>
          ))}
        </SimpleGrid>
      ) : (
        <Center>No Notes</Center>
      )}
    </>
  );
}
