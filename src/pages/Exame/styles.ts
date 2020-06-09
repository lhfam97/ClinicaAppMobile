import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';


export const CreateAccountButton = styled.TouchableOpacity`

  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #e0ebeb;
  border-top-width: 1px;
  border-color: #e0ebeb;
  justify-content: center;
  align-items: center;
  padding: 16px 0 ${16 + getBottomSpace()}px;
  flex-direction: row;
  margin-top:60;
`;

export const DetailsButton = styled.TouchableOpacity`

  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #e0ebeb;
  border-top-width: 1px;
  border-color: #e0ebeb;
  justify-content: center;
  align-items: center;
  /* padding: 16px 0 ${16 + getBottomSpace()}px; */
  flex-direction: row;
  margin-top:60;
  height: 30px;
`;

export const DetailsButtonText = styled.Text`
color: #312e38;
font-size: 16px;
font-family: 'Roboto-Regular';
margin-left: 16px;
`;


export const CreateAccountButtonText = styled.Text`
  color: #312e38;
  font-size: 18px;
  font-family: 'Roboto-Regular';
  margin-left: 16px;
`;
