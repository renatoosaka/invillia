import React, {useState, useEffect, useRef} from 'react';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Permissions from 'react-native-permissions';
import Axios from 'axios';
import {StatusBar, StyleSheet, Dimensions} from 'react-native';
import {
  Container,
  ScrollContainer,
  GymContainer,
  GymImage,
  GymName,
  GymAddress,
  GymFullRating,
  GymHalfRating,
  GymRatingContainer,
  GymContent,
} from './styles.js';
import Welcome from '../../components/Welcome';

export default props => {
  const [location, setLocation] = useState(null);
  const [locationPermission, setLocationPermission] = useState(null);
  const [gyms, setGyms] = useState([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const mapViewRef = useRef(null);

  useEffect(() => {
    Permissions.check('location').then(response => {
      if (response !== 'authorized') {
        Permissions.request('location').then(responseL => {
          setLocationPermission(responseL);
        });
      }
    });
  }, []);

  useEffect(() => {
    const watchID = Geolocation.watchPosition(
      position => {
        setLocation(position);
      },
      error => {
        console.log(error);
      },
    );

    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, [locationPermission]);

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
        location.coords.latitude
      },${
        location.coords.longitude
      }&radius=500&type=gym&key=AIzaSyAvl9q5Jj93iI8ep44aJRja7v8S190ppcE`;

      const {
        data: {results},
      } = await Axios.get(url);

      setGyms(results);
      setShowWelcome(false);
    };

    location && fetchData();
  }, [location]);

  const region = {
    latitude: location ? location.coords.latitude : 0,
    longitude: location ? location.coords.longitude : 0,
    latitudeDelta: location ? 0.0143 : 1,
    longitudeDelta: location ? 0.0134 : 1,
  };

  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="dark-content"
      />
      <Container>
        <MapView
          showsUserLocation
          loadingEnabled
          showsMyLocationButton={true}
          region={region}
          ref={mapViewRef}
          style={{...StyleSheet.absoluteFillObject}}>
          {gyms.map((gym, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: gym.geometry.location.lat,
                longitude: gym.geometry.location.lng,
              }}
              title={gym.name}
              description={`Avaliação: ${gym.rating}`}
              ref={mark => (gym.mark = mark)}
            />
          ))}
        </MapView>
        <ScrollContainer
          onMomentumScrollEnd={async e => {
            const place =
              e.nativeEvent.contentOffset.x > 0
                ? Math.round(
                    e.nativeEvent.contentOffset.x /
                      Dimensions.get('window').width,
                  )
                : 0;

            const {mark} = gyms[place];

            setTimeout(() => {
              mark.showCallout();
            }, 500);
          }}>
          {gyms.map((gym, index) => (
            <GymContainer key={index}>
              <GymImage
                source={{
                  uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photoreference=${
                    gym.photos[0].photo_reference
                  }&sensor=true&key=AIzaSyAvl9q5Jj93iI8ep44aJRja7v8S190ppcE`,
                }}
              />
              <GymContent>
                <GymName>{gym.name}</GymName>
                <GymAddress>{gym.vicinity}</GymAddress>
                <GymRatingContainer>
                  {[...Array(Math.trunc(gym.rating)).keys()].map(n => (
                    <GymFullRating key={n} />
                  ))}
                  {gym.rating - Math.trunc(gym.rating) > 0 && <GymHalfRating />}
                </GymRatingContainer>
              </GymContent>
            </GymContainer>
          ))}
        </ScrollContainer>
        <Welcome hide={!showWelcome} />
      </Container>
    </>
  );
};
