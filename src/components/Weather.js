import { useState, useEffect } from 'react';

import { currentWeather, dailyWeather } from '../api/weatherAPI';
import { tempConvert } from '../utils/tempConvert';
import { unixConvert } from '../utils/unixConvert';

import currentDummy from '../currentDummy.json';
import { Text, Flex, Grid, GridItem, Divider, HStack } from '@chakra-ui/react';

const Weather = () => {
  const [current, setCurrent] = useState(currentDummy);
  console.log(current);
  const { userTime, utcTime, localTime } = unixConvert(
    current.data.dt,
    current.data.timezone
  );

  console.log(userTime);
  console.log(utcTime);
  console.log(localTime);
  // useEffect(() => {
  //   dailyWeather();
  // }, []);
  return (
    <Grid w="100%" h="100%" templateColumns={['1fr 1fr', null]}>
      <GridItem>
        <Flex
          w="100%"
          h="100%"
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Text className={`fas fa-cloud fa-5x`} color="gray.300" />
          <Text fontSize="3xl">
            {tempConvert(current.data.main.temp).tempC}
          </Text>
        </Flex>
      </GridItem>
      <GridItem pr={1}>
        <Flex direction="column" h="100%" justify="center">
          <Flex justify="space-between" align="baseline">
            <Text fontSize="3xl">{current.data.name}</Text>
            <Text fontSize="sm">
              {localTime.split(' ').slice(0, 2).join(' ')}
            </Text>
          </Flex>
          <Divider my={2} />
          <Flex alignItems="center" justifyContent="space-between">
            <HStack spacing="16px">
              <Text className="fas fa-child" />
              <Text fontSize="md">Feels Like</Text>
            </HStack>
            <Text>{tempConvert(current.data.main.feels_like).tempC}</Text>
          </Flex>
          <Divider my={1} />
          <Flex alignItems="center" justifyContent="space-between">
            <HStack spacing="12px">
              <Text className="fas fa-temperature-high" />
              <Text fontSize="md">High</Text>
            </HStack>
            <Text>{tempConvert(current.data.main.temp_max).tempC}</Text>
          </Flex>
          <Divider my={1} />
          <Flex alignItems="center" justifyContent="space-between">
            <HStack spacing="12px">
              <Text className="fas fa-temperature-low" />
              <Text fontSize="md">Low</Text>
            </HStack>
            <Text>{tempConvert(current.data.main.temp_min).tempC}</Text>
          </Flex>
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default Weather;
