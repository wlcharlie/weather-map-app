import { useState, useEffect, useRef } from 'react';

import H from '@here/maps-api-for-javascript';

const Map = () => {
  const [map, setMap] = useState(null);
  const mapDom = useRef();

  useEffect(() => {
    if (!map) {
      const platform = new H.service.Platform({
        apikey: process.env.REACT_APP_MAP_API,
      });

      const layers = platform.createDefaultLayers();
      const mapping = new H.Map(mapDom.current, layers.vector.normal.map, {
        pixelRatio: window.devicePixelRatio,
        center: { lat: 0, lng: 0 },
        zoom: 2,
      });
      setMap(mapping);
    }
  }, []);

  return <div style={{ width: '100%', height: '100%' }} ref={mapDom}></div>;
};

export default Map;
