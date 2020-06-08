import React, { useRef, useCallback } from 'react';
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';
import Icon from 'react-native-vector-icons/Feather';
import { Container, Title, BackToSignIn, BackToSignInText } from './styles';

interface SignUpFormData {
  name: string;
  crm: string;
  expertise: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const crmInputRef = useRef<TextInput>(null);
  const especialidadeInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          crm: Yup.string().required('Crm é obrigatório'),
          expertise: Yup.string().required('Especialidade é obrigatório'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
        });
        console.log(data);
        await schema.validate(data, { abortEarly: false });
        console.log("Passou 1");
        await api.post('/doctors', data);
        console.log("Passou 2");
        Alert.alert(
          'Cadastro realizado com sucesso!',
          'Você ja pode fazer login na aplicação.',
        );
        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current.setErrors(errors);
          return;
        }
        console.log(err)
        Alert.alert(
          'Erro na cadastro',
          'Ocorreu um error ao fazer cadastro, tente novamente.',
        );
      }
    },
    [navigation],
  );

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}>
          <Container>
            <Image source={logoImg} />

            <View>
              <Title>Crie sua conta</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  crmInputRef.current.focus();
                }}
              />

              <Input
                ref={crmInputRef}
                autoCorrect={false}
                autoCapitalize="none"
                name="crm"
                icon="file-text"
                placeholder="CRM"
                returnKeyType="next"
                onSubmitEditing={() => especialidadeInputRef.current.focus()}
              />

              <Input
                ref={especialidadeInputRef}
                autoCorrect={false}
                autoCapitalize="none"
                name="expertise"
                icon="file-text"
                placeholder="Especialidade"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current.focus()}
              />

              <Input
                ref={passwordInputRef}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Senha"
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current.submitForm()}
              />

              <Button onPress={() => formRef.current.submitForm()}>
                Criar
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToSignIn onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} />
        <BackToSignInText>Voltar para logon</BackToSignInText>
      </BackToSignIn>
    </>
  );
};

export default SignUp;
