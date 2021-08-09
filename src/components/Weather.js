import { useState, useEffect } from 'react';

import { currentWeather } from '../api/weatherAPI';
import { tempConvert } from '../utils/tempConvert';
import { unixConvert } from '../utils/unixConvert';

import { useSpring, animated, config, useSpringRef } from 'react-spring';

import currentDummy from '../currentDummy.json';
import {
  Text,
  Flex,
  Grid,
  GridItem,
  Divider,
  HStack,
  Skeleton,
  Image,
  Box,
} from '@chakra-ui/react';

const Weather = ({ target }) => {
  const [current, setCurrent] = useState(null);
  const [flip, set] = useState(false);

  const options = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    delay: 500,
    config: { duration: 1500 },
  });
  const { tempC, temp_feel, temp_high, temp_low } = useSpring({
    reset: true,
    reverse: flip,
    from: { tempC: 0, temp_feel: 0, temp_high: 0, temp_low: 0 },
    tempC: current && +tempConvert(current.data.main.temp).tempC.split(' ')[0],
    temp_feel:
      current && +tempConvert(current.data.main.feels_like).tempC.split(' ')[0],
    temp_high:
      current && +tempConvert(current.data.main.temp_max).tempC.split(' ')[0],
    temp_low:
      current && +tempConvert(current.data.main.temp_min).tempC.split(' ')[0],
    delay: 600,
    config: config.molasses,
  });
  const { size, ...rest } = useSpring({
    loop: true,
    from: { x: 0 },
    to: [{ x: 20 }, { x: 0 }],
    delay: 100,
    config: { ...config.slow, duration: 5000 },
  });

  // const { userTime, utcTime, localTime } = unixConvert(
  //   current.data.dt,
  //   current.data.timezone
  // );

  useEffect(async () => {
    setCurrent(await currentWeather(target));
  }, [target]);

  return current ? (
    <animated.div style={options}>
      <Grid
        w="100%"
        h="100%"
        templateColumns={['1fr 1fr', '1fr']}
        templateRows={[null, '1fr 1fr']}
      >
        <GridItem>
          <Flex
            w="100%"
            h="100%"
            direction={['column', 'row']}
            alignItems="center"
            justifyContent={['center', 'space-around']}
          >
            <Box display="flex" alignItems="center" justifyContent="center">
              <animated.div style={{ ...rest, width: size, height: size }}>
                <Image
                  src={`http://openweathermap.org/img/wn/${current.data.weather[0].icon}@2x.png`}
                />
              </animated.div>
            </Box>
            {/* <Text className={`fas fa-cloud fa-5x`} color="gray.300" /> */}
            <Box>
              <Text fontSize="3xl">
                <animated.div>
                  {tempC.to(n => n.toFixed(0) + ` \xB0C`)}
                </animated.div>
              </Text>
              <Text>{current.data.weather[0].main}</Text>
            </Box>
          </Flex>
        </GridItem>
        <GridItem px={2}>
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
              <Text>
                <animated.div>
                  {temp_feel.to(n => n.toFixed(0) + ` \xB0C`)}
                </animated.div>
              </Text>
            </Flex>
            <Divider my={1} />
            <Flex alignItems="center" justifyContent="space-between">
              <HStack spacing="12px">
                <Text className="fas fa-temperature-high" />
                <Text fontSize="md">High</Text>
              </HStack>
              <Text>
                <animated.div>
                  {temp_high.to(n => n.toFixed(0) + ` \xB0C`)}
                </animated.div>
              </Text>
            </Flex>
            <Divider my={1} />
            <Flex alignItems="center" justifyContent="space-between">
              <HStack spacing="12px">
                <Text className="fas fa-temperature-low" />
                <Text fontSize="md">Low</Text>
              </HStack>
              <Text>
                <animated.div>
                  {temp_low.to(n => n.toFixed(0) + ` \xB0C`)}
                </animated.div>
              </Text>
            </Flex>
          </Flex>
        </GridItem>
      </Grid>
    </animated.div>
  ) : (
    <Grid
      w="100%"
      h="100%"
      templateColumns={['1fr 1fr', '1fr']}
      templateRows={[null, '1fr 1fr']}
    >
      <GridItem>
        <Flex
          w="100%"
          h="100%"
          direction={['column', 'row']}
          alignItems="center"
          justifyContent={['center', 'space-around']}
        >
          <Skeleton width="125px" height="125px">
            pic
          </Skeleton>
          <Box>
            <Skeleton>weather</Skeleton>
          </Box>
        </Flex>
      </GridItem>
      <GridItem px={2}>
        <Flex direction="column" h="100%" justify="center">
          <Flex justify="space-between" align="baseline">
            <Skeleton>Place</Skeleton>
            <Skeleton>Date</Skeleton>
          </Flex>
          <Divider my={2} />
          <Flex alignItems="center" justifyContent="space-between">
            <Skeleton width="100%">temp</Skeleton>
          </Flex>
          <Divider my={1} />
          <Flex alignItems="center" justifyContent="space-between">
            <Skeleton width="100%">temp</Skeleton>
          </Flex>
          <Divider my={1} />
          <Flex alignItems="center" justifyContent="space-between">
            <Skeleton width="100%">temp</Skeleton>
          </Flex>
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default Weather;
