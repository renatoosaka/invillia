import React, {useState, useEffect} from 'react';
import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Permissions from 'react-native-permissions';
import {StatusBar, StyleSheet} from 'react-native';
import {Container} from './styles.js';

export default props => {
  const [location, setLocation] = useState(null);
  const [locationPermission, setLocationPermission] = useState(null);

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

  const region = {
    latitude: location ? location.coords.latitude : 0,
    longitude: location ? location.coords.longitude : 0,
    latitudeDelta: location ? 0.0143 : 1,
    longitudeDelta: location ? 0.0134 : 1,
  }

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
          style={{...StyleSheet.absoluteFillObject}}
        />
      </Container>
    </>
  );
};
