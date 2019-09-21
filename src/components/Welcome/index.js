import React, {useState, useEffect} from 'react';
import {Animated, Dimensions} from 'react-native';
import {Container, Logo} from './styles';

export default props => {
  const {height} = Dimensions.get('window');
  const AnimatedContainer = Animated.createAnimatedComponent(Container);
  const [fadeAnimation] = useState(new Animated.Value(1));
  const [heightAnimation] = useState(new Animated.Value(height));

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnimation, {
        toValue: 0,
        duration: 1000,
      }),
      Animated.timing(heightAnimation, {
        toValue: 0,
        duration: 200,
      }),
    ]).start();
  }, [heightAnimation, fadeAnimation, props.hide]);

  return (
    <AnimatedContainer
      style={{opacity: fadeAnimation, height: heightAnimation}}>
      <Logo source={require('../../images/logo.png')} />
    </AnimatedContainer>
  );
};
