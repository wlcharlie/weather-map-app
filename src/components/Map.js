import { useState, useEffect, useRef } from 'react';
import { Box } from '@chakra-ui/layout';
import H from '@here/maps-api-for-javascript';

const Map = () => {
  const [map, setMap] = useState(null);
  const mapDom = useRef();
  const location = { lat: 55, lng: 38 };

  useEffect(async () => {
    function resizeMap(mapping) {
      mapping.getViewPort().resize();
    }
    if (!map) {
      const platform = new H.service.Platform({
        apikey: process.env.REACT_APP_MAP_API,
      });

      const layers = platform.createDefaultLayers();
      const mapping = new H.Map(mapDom.current, layers.vector.normal.map, {
        pixelRatio: window.devicePixelRatio,
        center: location,
        zoom: 10,
      });
      const marker = new H.map.Marker(location);
      mapping.addObject(marker);

      const mapEvents = new H.mapevents.MapEvents(mapping);
      mapping.addEventListener('tap', function getCoord(evt) {
        const coord = mapping.screenToGeo(
          evt.currentPointer.viewportX,
          evt.currentPointer.viewportY
        );
        console.log(coord.lat.toFixed(4), coord.lng.toFixed(4));
        console.log(
          'Clicked at ' +
            Math.abs(coord.lat.toFixed(4)) +
            (coord.lat > 0 ? 'N' : 'S') +
            ' ' +
            Math.abs(coord.lng.toFixed(4)) +
            (coord.lng > 0 ? 'E' : 'W')
        );
      });

      const behavior = new H.mapevents.Behavior(mapEvents);
      window.addEventListener('resize', resizeMap(mapping));
      setMap(mapping);
    }

    return window.removeEventListener('resize', resizeMap);
  }, []);

  return <Box w="100%" h={['100%', '50vh']} ref={mapDom} />;
};

export default Map;
