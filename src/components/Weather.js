import { useState, useEffect } from 'react';

import { currentWeather } from '../api/weatherAPI';
import { tempConvert } from '../utils/tempConvert';
import { unixConvert } from '../utils/unixConvert';

import currentDummy from '../currentDummy.json';
import {
  Text,
  Flex,
  Grid,
  GridItem,
  Divider,
  HStack,
  Stack,
  Skeleton,
  Image,
} from '@chakra-ui/react';

const Weather = ({ target }) => {
  const [current, setCurrent] = useState(null);
  // const { userTime, utcTime, localTime } = unixConvert(
  //   current.data.dt,
  //   current.data.timezone
  // );
  useEffect(async () => {
    setCurrent(await currentWeather(target));
  }, [target]);
  console.log(current);

  return current ? (
    <Grid w="100%" h="100%" templateColumns={['1fr 1fr', null]}>
      <GridItem>
        <Flex
          w="100%"
          h="100%"
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Image
            boxSize="125px"
            src={`http://openweathermap.org/img/wn/${current.data.weather[0].icon}@2x.png`}
          />
          {/* <Text className={`fas fa-cloud fa-5x`} color="gray.300" /> */}
          <Text fontSize="3xl">
            {tempConvert(current.data.main.temp).tempC}
          </Text>
          <Text>{current.data.weather[0].main}</Text>
        </Flex>
      </GridItem>
      <GridItem pr={1}>
        <Flex direction="column" h="100%" justify="center">
          <Flex justify="space-between" align="baseline">
            <Text fontSize="3xl">{current.data.name}</Text>
            <Text fontSize="sm">
              {unixConvert(current.data.dt, current.data.timezone)
                .localTime.split(' ')
                .slice(0, 2)
                .join(' ')}
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
  ) : (
    <Stack>
      <Skeleton height="20px" />
      <Skeleton height="20px" />
      <Skeleton height="20px" />
    </Stack>
  );
};

export default Weather;
