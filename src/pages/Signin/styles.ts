import styled from 'styled-components/native';
import {Platform} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  /* margin-top: 40px; */
  padding: 0 30px ${Platform.OS === 'android' ? 120 : 40}px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #fff;
  font-family: 'Roboto-Medium';
  margin: 64px 0 24px 0;
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 24px;
`;
export const ForgotPasswordText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-family: 'Roboto-Regular';
`;

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
`;
export const CreateAccountButtonText = styled.Text`
  color: #312e38;
  font-size: 18px;
  font-family: 'Roboto-Regular';
  margin-left: 16px;
`;
