import Image from 'next/image';
import { useState, useEffect, SetStateAction } from 'react';
import ReactMapGl, { Marker } from 'react-map-gl';
import Geocode from 'react-geocode';
import 'mapbox-gl/dist/mapbox-gl.css';

type JSONValue = {
  id: string;
  name: string;
  slug: string;
  venue: string;
  address: string;
  performers: string;
  date: string;
  time: string;
  description: string;
  image: any;
};

type pageProps = {
  evt: JSONValue;
};

export default function EventMap({ evt }: pageProps) {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewport, setViewport] = useState({
    latitude: 37.712772,
    longitude: -73.935242,
    width: '100%',
    height: '500px',
    zoom: 12,
  });

  useEffect(() => {
    //  Get latitude & longitude  from address
    Geocode.fromAddress(evt.address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setLat(lat);
        setLng(lng);
        setViewport({ ...viewport, latitude: lat, longitude: lng });
        setLoading(false);
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string);

  if (loading) return <div>Loading...</div>;
  if (lat && lng !== null) {
    return (
      <ReactMapGl
        {...viewport}
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN_KEY}
        onViewportChange={(
          vp: SetStateAction<{
            latitude: number;
            longitude: number;
            width: string;
            height: string;
            zoom: number;
          }>
        ) => setViewport(vp)}>
        <Marker key={evt.id} latitude={lat} longitude={lng}>
          <Image src='/images/pin.svg' width={30} height={30} />
        </Marker>
      </ReactMapGl>
    );
  } else {
    return <div>No map available</div>;
  }
}
