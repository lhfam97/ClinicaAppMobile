import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import Icon from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import InputGrande from '../../components/InputGrande';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
} from './styles';
interface Consulta {
  Consulta_id: string;
  patient_name: string;
  doctor_name: string;
  patient_cpf: string;
  cobertura_name: string;
}
interface ExameFormData {
  consulta_id: string;
  descricao: string;
}

const RequererExame: React.FC = ({ route }) => {
  const navigation = useNavigation();
  // const { consultaId } = route.params;
  // const [consultas, setConsultas] = useState<Consulta[]>([])
  // console.log(route.params)
  console.log(route.params);
  const { consultaId } = route.params;
  const formRef = useRef<FormHandles>(null);

  const handleSignIn = useCallback(async (data: ExameFormData) => {
    try {
      const schema = Yup.object().shape({
        descricao: Yup.string().min(10, 'No mínimo 10 caracteres'),
      });

      data.consulta_id = consultaId;
      console.log(data);
      await schema.validate(data, { abortEarly: false });
      // console.log("Passou 1");
      await api.post('/exames', data);

      Alert.alert(
        'Exame registrado com sucesso!',
        'Você ja pode visualiza-la na aplicação.',
      );
      navigation.goBack();
    } catch (err) {
      Alert.alert(
        'Erro na autenticação',
        'Ocorreu um error ao fazer registro, cheque se o valor tem mais de 10 letras.',
      );
    }
  }, []);

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
            <View>
              <Title>EXAME</Title>
            </View>

            <Form onSubmit={handleSignIn} ref={formRef}>
              <InputGrande
                autoCorrect={false}
                autoCapitalize="none"
                name="descricao"
                icon="file-text"
                placeholder="Descricao"
                returnKeyType="next"
                onSubmitEditing={() => formRef.current.submitForm()}
              />

              <Button onPress={() => formRef.current.submitForm()}>
                Registrar Exame
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

// return (
//   <>
//     <Text style={{ color: '#fff', fontSize: 26 }}>Seja bem Vinda Leticia</Text>
//     <Image style={{ height: 320, width: 320 }} source={leticia} />
//     <View style={{ flex: 1, justifyContent: "center" }}>
//       <Button title="sair" onPress={signOut} />
//     </View>
//   </>
// );
// };

export default RequererExame;
