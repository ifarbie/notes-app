import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure } from '@chakra-ui/react';
import { gql, useMutation } from '@apollo/client';
import { EditIcon } from '@chakra-ui/icons';
import Note from '@/types/Note';

type Props = {
  id: string;
  note: Note;
  setNote: Dispatch<SetStateAction<Note>>;
};

type FormField = {
  title: string;
  body: string;
};

const updateNoteQuery = gql`
  mutation UpdateNoteMutation($id: String!, $note: NoteInput!) {
    updateNote(id: $id, note: $note) {
      id
      title
      body
      createdAt
    }
  }
`;

export default function EditNoteModal({ id, setNote, note }: Props) {
  const [formField, setFormField] = useState<FormField>({ title: '', body: '' });
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [updateNote, { loading }] = useMutation(updateNoteQuery);
  const initialRef = useRef(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormField({ ...formField, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setFormField({ title: note.title, body: note.body });
  }, [note]);

  const handleEditNote = async (e: FormEvent<HTMLDivElement>) => {
    try {
      e.preventDefault();
      const { data } = await updateNote({
        variables: {
          id,
          note: formField,
        },
      });
      setNote(() => data.updateNote);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box position={'absolute'} right={16} top={9} cursor={'pointer'} color={'yellow'} _hover={{ filter: 'brightness(0.8)' }} onClick={onOpen}>
        <EditIcon boxSize={5} />
      </Box>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Box as={'form'} onSubmit={handleEditNote}>
            <ModalHeader>Edit a note</ModalHeader>
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
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
}
