'use client';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Link } from '@chakra-ui/next-js';
import { Box, Center, Heading } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <Heading as={'h1'} marginBottom={14} marginTop={3}>
      {pathname !== '/' ? (
        <Box position={'absolute'} left={8} top={5} cursor={'pointer'} _hover={{ filter: 'brightness(0.8)' }}>
          <Link href={'/'}>
            <ArrowBackIcon boxSize={7} />
          </Link>
        </Box>
      ) : null}
      <Center>
        <Link href={'/'} _hover={{ textDecoration: 'none' }} fontSize={'3xl'}>
          Notes
        </Link>
      </Center>
    </Heading>
  );
}
