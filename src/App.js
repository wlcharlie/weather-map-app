import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
  Text,
  Flex,
  GridItem,
  Stack,
  Skeleton,
  Divider,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

import Map from './components/Map';
import Weather from './components/Weather';
import Chart from './components/Chart';

function App() {
  const [target, setTarget] = useState({ lat: 55, lng: 38 });
  const coordinate = data => {
    setTarget(data);
  };
  console.log(target);

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid
          minH="100vh"
          gap="3"
          templateRows={['1fr 1fr 1fr 0.25fr', '50vh 40vh 5vh']}
          templateColumns={[null, 'repeat(3, 1fr)']}
        >
          <GridItem w="100%" h="100%" borderRadius="lg" colSpan={[null, '3']}>
            <Map getCoordinate={coordinate} target={target} />
          </GridItem>
          <GridItem w="100%" h="100%" borderRadius="lg" colSpan={[null, '1']}>
            <Weather target={target} />
          </GridItem>
          <GridItem
            w="100%"
            h="100%"
            px="3"
            borderRadius="lg"
            colSpan={[null, '2']}
          >
            <Chart target={target} />
          </GridItem>
          <GridItem w="100%" h="100%" colSpan={[null, '3']}>
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
