'use client';

import { Box, Center, Heading, Text } from '@chakra-ui/react';
import { gql, useQuery } from '@apollo/client';
import DeleteNoteModal from '@/app/notes/[id]/_components/DeleteNoteModal';
import { formatDate } from '@/utils/functions';
import EditNoteModal from './_components/EditNoteModal';
import Loading from '@/components/Loading';
import { useState } from 'react';
import Note from '@/types/Note';

type Props = {
  params: {
    id: string;
  };
};

const noteByIdQuery = gql`
  query GetNoteById($id: String!) {
    note(id: $id) {
      id
      title
      body
      createdAt
    }
  }
`;

export default function NoteDetailPage({ params }: Props) {
  const [note, setNote] = useState<Note>({ id: '', title: '', body: '', createdAt: '' });
  const { id } = params;
  const { error, loading } = useQuery(noteByIdQuery, {
    onCompleted: (data) => {
      setNote(() => data.note);
    },
    variables: {
      id,
    },
  });

  if (loading) return <Loading />;
  if (error) return <Center>Note not Found</Center>;
  return (
    <>
      <DeleteNoteModal id={id} />
      <EditNoteModal id={id} setNote={setNote} note={note} />
      
      <Box paddingInline={6}>
        <Text>{formatDate(Number(note.createdAt))}</Text>
        <Heading as='h4'>{note.title}</Heading>
        <Text marginTop={7}>{note.body}</Text>
      </Box>
    </>
  );
}
