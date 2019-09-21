import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width} = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  background-color: #0984e3;
`;

export const ScrollContainer = styled.ScrollView.attrs({
  showsHorizontalScrollIndicator: false,
  horizontal: true,
  pagingEnabled: true,
})`
  position: absolute;
  background-color: transparent;
  height: 120px;
  width: 100%;
  bottom: 5px;
  left: 0;
`;

export const GymContainer = styled.View`
  height: 120px;
  width: ${`${width - 40}px`};
  background-color: #fff;
  margin-left: 20px;
  margin-right: 20px;
  flex-direction: row;
  flex: 1;
`;

export const GymImage = styled.Image`
  width: 100px;
  height: 120px;
  resize-mode: cover;
`;

export const GymContent = styled.View`
  flex: 1;
  height: 120px;
  background-color: #fff;
  padding: 5px;
`;

export const GymName = styled.Text`
  font-weight: bold;
  font-size: 14px;
`;

export const GymAddress = styled.Text`
  padding-top: 10px;
`;

export const GymRatingContainer = styled.View`
  flex: 1;
  flex-direction: row;
  background-color: transparent;
  width: 100%;
  padding-top: 10px;
`;

export const GymFullRating = styled(Icon).attrs({
  name: 'star',
})`
  font-size: 15px;
  color: #000;
`;

export const GymHalfRating = styled(Icon).attrs({
  name: 'star-half',
})`
  font-size: 15px;
  color: #000;
`;
