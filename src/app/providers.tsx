'use client';
import { Box, ChakraProvider } from '@chakra-ui/react';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '@/lib/apollo';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider>
        <Box backgroundColor={'#3ba6f4'}>
          <Box as='main' maxWidth={'500px'} minHeight={'580px'} backgroundColor={'#0a0453'} rounded={'3xl'} marginInline={'auto'} textColor={'#d5f5ff'} padding={4} position={'relative'} marginTop={2}>
            {children}
          </Box>
        </Box>
      </ChakraProvider>
    </ApolloProvider>
  );
}
