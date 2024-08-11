import React, { ChangeEvent, FormEvent, MutableRefObject, useState } from 'react';
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea } from '@chakra-ui/react';
import { gql, useMutation } from '@apollo/client';
import NoteInputArgs from '@/types/NoteInputArgs';

type Props = {
  initialRef: MutableRefObject<null>;
  isOpen: boolean;
  onClose: () => void;
};

type FormField = {
  title: string;
  body: string;
};

const AddNoteQuery = (note: NoteInputArgs) => gql`
   mutation {
    addNote(note: ${note}) {
        id
    }
   }
`

export default function AddNoteModal({ initialRef, isOpen, onClose }: Props) {
  const [formField, setFormField] = useState<FormField>({ title: '', body: '' });
  const handleSubmit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();1
    console.log('SUBMIT');
    console.log(e);
    // onClose();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormField({ ...formField, [e.target.name]: e.target.value });
  };

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent as={'form'} onSubmit={handleSubmit}>
        <ModalHeader>Create a note</ModalHeader>
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
          <Button colorScheme='blue' mr={3} type='submit'>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
