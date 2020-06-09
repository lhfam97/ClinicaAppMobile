import React, { useState, useEffect } from 'react';
import { View, Text, Image, SafeAreaView, FlatList, StyleSheet, Alert, TouchableOpacity, } from 'react-native';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import Icon from 'react-native-vector-icons/Feather';
import Button from '../../components/Button'
import { useNavigation } from '@react-navigation/native';
import {
  CreateAccountButton,
  CreateAccountButtonText,
} from './styles';
import SignUp from '../Signup';
interface Consulta {
  Consulta_id: string
  patient_name: string,
  doctor_name: string,
  patient_cpf: string,
  cobertura_name: string

}


const ConsultaDetalhada: React.FC = ({ route }) => {
  const { signOut } = useAuth();
  const navigation = useNavigation();
  const { consultaId, patient_name, doctor_name, patient_cpf, cobertura_name, time_date,
    expertise_name } = route.params;
  const [consultas, setConsultas] = useState<Consulta[]>([])
  // console.log(route.params)
  console.log(route.params);
  // async function handleLikeRepository() {
  // }
  // useEffect(() => {
  //   try {
  //     api.get("consulta").then((response) => {
  //       setConsultas(response.data)
  //     })
  //   }
  //   catch (err) {
  //     Alert.alert(
  //       'Erro na autenticação',
  //       'Ocorreu um error ao fazer login, cheque as credenciais.',
  //     );
  //   }
  // }, [navigation])

  // const { signOut } = useAuth()

  return (
    <>
      <Text style={{ fontSize: 12, marginTop: 30, marginHorizontal: 15, color: '#fff' }}>Consulta : {consultaId}</Text>
      <View style={styles.container}>

        <Text><Text style={{ fontWeight: 'bold' }}>Nome do Paciente:</Text>  {patient_name}</Text>
        <Text><Text style={{ fontWeight: 'bold' }}>CPF do Paciente:</Text>  {patient_cpf}</Text>
        <Text><Text style={{ fontWeight: 'bold' }}>Data da Consulta:</Text>  {time_date}</Text>
        <Text><Text style={{ fontWeight: 'bold' }}>Cobertura:</Text>  {cobertura_name}</Text>
        <Text><Text style={{ fontWeight: 'bold' }}>Médico:</Text>  {doctor_name} </Text>
        <Text><Text style={{ fontWeight: 'bold' }}>Especialidade:</Text>  {expertise_name}</Text>

        {/* <CreateAccountButton onPress={() => navigation.navigate('CriarConsulta')}>
        <Icon name="log-in" size={20} />
        <CreateAccountButtonText>Criar uma consulta</CreateAccountButtonText>
      </CreateAccountButton> */}
      </View>
      <Button onPress={() => navigation.navigate("ReceitaMedica", {
        consultaId: consultaId,
        patient_name: patient_name,
        doctor_name: doctor_name
      })}>Listar Receitas Médicas</Button>
      <Button onPress={() => navigation.navigate("RegistrarReceita", {
        consultaId: consultaId
      })}>Registrar Receitas Médicas</Button>
      <Button onPress={() => navigation.navigate("Exame", {
        consultaId: consultaId,
        patient_name: patient_name,
        doctor_name: doctor_name
      })}>Listar Exames</Button>
      {/* <Button onPress={() => signOut()}>Listar Exames</Button> */}
      <Button onPress={() => navigation.navigate("RequererExame", {
        consultaId: consultaId,

      })}>Requerer Exames</Button>

    </>
  )
};
const styles = StyleSheet.create({
  container: {

    // flex: 1,
    marginTop: 40,
    marginHorizontal: 30,
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 50
  },
  repositoryContainer: {
    marginTop: 20,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 10,
  },
  repository: {
    margin: 0,
    fontSize: 11,
    fontWeight: "bold",
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
  flatList: {
    marginBottom: 100
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover'
  }
})

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

export default ConsultaDetalhada;