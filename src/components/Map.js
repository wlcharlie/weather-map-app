import { useState, useEffect, useRef } from 'react';
import { Box } from '@chakra-ui/layout';
import H from '@here/maps-api-for-javascript';

const Map = props => {
  const [map, setMap] = useState(null);
  const [mark, setMark] = useState({});
  const mapDom = useRef();

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
        center: props.target,
        zoom: 12,
      });
      const marker = new H.map.Marker(props.target);
      mapping.addObject(marker);
      setMark(marker);

      const mapEvents = new H.mapevents.MapEvents(mapping);
      mapping.addEventListener('tap', function getCoord(evt) {
        const coord = mapping.screenToGeo(
          evt.currentPointer.viewportX,
          evt.currentPointer.viewportY
        );
        props.getCoordinate({
          lat: +coord.lat.toFixed(4),
          lng: +coord.lng.toFixed(4),
        });
      });

      const behavior = new H.mapevents.Behavior(mapEvents);
      window.addEventListener('resize', resizeMap(mapping));
      setMap(mapping);
    }

    return window.removeEventListener('resize', resizeMap);
  }, []);

  useEffect(() => {
    if (map) {
      map.removeObject(mark);
      const marker = new H.map.Marker(props.target);
      map.addObject(marker);
      setMark(marker);
    }
  }, [props.target]);

  return <Box w="100%" h={['100%', '50vh']} ref={mapDom} />;
};

export default Map;
