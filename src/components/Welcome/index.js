import React, {useState, useEffect} from 'react';
import {Animated} from 'react-native';
import {Container, Logo} from './styles';

export default props => {
  const AnimatedContainer = Animated.createAnimatedComponent(Container);
  const [fadeAnimation] = useState(new Animated.Value(1));

  useEffect(() => {
    console.log('animation');
    console.log(props.hide);
    Animated.timing(fadeAnimation, {
      toValue: 0,
      duration: 1000,
    }).start();
  }, [fadeAnimation, props.hide]);

  return (
    <AnimatedContainer style={{opacity: fadeAnimation}}>
      <Logo source={require('../../images/logo.png')} />
    </AnimatedContainer>
  );
};
