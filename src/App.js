import React from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
  Text,
  Flex,
  GridItem,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { createBreakpoints } from '@chakra-ui/theme-tools';

import Map from './components/Map';
import Weather from './components/Weather';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid
          minH="100vh"
          p={3}
          gap={3}
          templateRows={['1fr 1fr 1fr 0.25fr', 'repeat(2, 1fr)']}
          templateColumns={[null, 'repeat(3, 1fr)']}
        >
          <GridItem
            w="100%"
            h="100%"
            bg="tomato"
            borderRadius="lg"
            colSpan={[null, '3']}
          >
            map here
          </GridItem>
          <GridItem w="100%" h="100%" borderRadius="lg" colSpan={[null, '1']}>
            <Weather></Weather>
          </GridItem>
          <GridItem
            w="100%"
            h="100%"
            bg="tomato"
            borderRadius="lg"
            colSpan={[null, '2']}
          >
            CHART
          </GridItem>
          <GridItem colSpan={[null, '3']}>
            <Flex align="center" justify="center" my={2}>
              <Text fontSize="md">Charlie | Blog | Repo</Text>
              <ColorModeSwitcher justifySelf="flex-end" />
            </Flex>
          </GridItem>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
