'use client';

import { Box, Editable, EditableInput, EditablePreview, EditableTextarea, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { gql, useQuery } from '@apollo/client';

type Props = {
  params: {
    id: string;
  };
};

const noteByIdQuery = (id: number) => gql`
  query {
    note(id: ${id}) {
      id
      title
      body
      createdAt
    }
  }
`;

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
};

export default function NoteDetailPage({ params }: Props) {
  const { id } = params;
  const { data, error, loading } = useQuery(noteByIdQuery(Number(id)));

  const handleSubmit = (e: string) => {
    
  }

  return (
    <Box paddingInline={6}>
      <Heading as='h4'>
        <Editable defaultValue='Take some chakra' onSubmit={handleSubmit}>
          <EditablePreview />
          <EditableInput />
        </Editable>
      </Heading>
      {loading ? <p>Loading...</p> : <Text>{formatDate(parseInt(data?.note.createdAt))}</Text>}

      <Editable defaultValue='Take some chakra' marginTop={7} height={'100%'}>
        <EditablePreview />
        <EditableTextarea />
      </Editable>
    </Box>
  );
}
