import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useRef, useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure } from '@chakra-ui/react';
import { gql, useMutation } from '@apollo/client';
import { AddIcon } from '@chakra-ui/icons';
import Note from '@/types/Note';

type Props = {
  setNotes: Dispatch<SetStateAction<Note[]>>;
};

type AddNoteMutationResult = {
  addNote: {
    id: string;
    title: string;
    createdAt: string;
    body: string;
  };
};

type FormField = {
  title: string;
  body: string;
};

const AddNoteQuery = gql`
  mutation AddNoteMutation($note: NoteInput!) {
    addNote(note: $note) {
      id
      title
      createdAt
      body
    }
  }
`;

export default function AddNoteModal({ setNotes }: Props) {
  const [formField, setFormField] = useState<FormField>({ title: '', body: '' });
  const [addNote, { loading }] = useMutation<AddNoteMutationResult>(AddNoteQuery);
  const { onOpen, isOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);

  const handleSubmit = async (e: FormEvent<HTMLElement>) => {
    try {
      e.preventDefault();
      const { data } = await addNote({
        variables: {
          note: formField,
        },
      });
      if (data) setNotes((prevNotes: Note[]) => [...prevNotes, { ...data.addNote }]);
      setFormField({ title: '', body: '' });
      onClose();
    } catch (error) {
      console.log(error);
      onClose();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormField({ ...formField, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Button
        variant='outline'
        position={'absolute'}
        right={7}
        top={8}
        onClick={onOpen}
        _hover={{ backgroundColor: 'lightBlue', color: 'darkBlue', borderColor: 'lightBlue' }}
        padding={3}
        rounded={'xl'}
        borderColor={'#36b9ff'}
        textColor={'#d8fffc'}
      >
        <AddIcon />
      </Button>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Box as={'form'} onSubmit={handleSubmit}>
            <ModalHeader>Add a note</ModalHeader>
            <ModalCloseButton />

            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Note&apos;s Title</FormLabel>
                <Input ref={initialRef} placeholder="Note's Title" name='title' onChange={handleChange} value={formField.title} />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Note&apos;s Body</FormLabel>
                <Textarea placeholder="Note's Body" name='body' onChange={handleChange} value={formField.body} />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3} type='submit' isLoading={loading}>
                Add
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
}
