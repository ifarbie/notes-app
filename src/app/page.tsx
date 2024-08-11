'use client';

import NotesCard from '@/components/NotesCard';
import { Button, GridItem, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { gql, useQuery } from '@apollo/client';
import Note from '@/types/Note';
import { useRef } from 'react';
import AddNoteModal from '@/components/AddNoteModal';

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
  const { data, error, loading } = useQuery(AllNotesQuery);
  const { onOpen, isOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <AddNoteModal initialRef={initialRef} isOpen={isOpen} onClose={onClose} />
      <Button colorScheme='darkBlue' variant='outline' position={'absolute'} right={7} top={6} onClick={onOpen}>
        +
      </Button>
      <SimpleGrid columns={2} gap={6} paddingX={4}>
        {data?.notes.map((note: Note) => (
          <GridItem key={note.id}>
            <NotesCard id={note.id} />
          </GridItem>
        ))}
      </SimpleGrid>
    </>
  );
}
