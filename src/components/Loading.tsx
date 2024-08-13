import { Center, CircularProgress } from '@chakra-ui/react';

export default function Loading() {
  return (
    <Center>
      <CircularProgress isIndeterminate color='blue.300' />
    </Center>
  );
}
