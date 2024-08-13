import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';

const deleteNoteQueryById = gql`
  mutation DeleteNoteMutation($id: Int!) {
    deleteNote(id: $id)
  }
`;

export default function DeleteNoteModal({ id }: { id: number }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteNote, { loading, error }] = useMutation(deleteNoteQueryById);
  const router = useRouter();

  const handleDeleteNote = async () => {
    try {
      await deleteNote({
        variables: {
          id,
        },
      });
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box position={'absolute'} right={8} top={9} cursor={'pointer'} color={'red'} _hover={{ filter: 'brightness(0.8)' }} onClick={onOpen}>
        <DeleteIcon boxSize={5} />
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete this note?</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button variant='ghost' onClick={handleDeleteNote} isLoading={loading}>
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
