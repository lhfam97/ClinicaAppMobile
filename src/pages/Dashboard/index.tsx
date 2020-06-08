import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, SafeAreaView, FlatList, StyleSheet, Alert, TouchableOpacity, } from 'react-native';
import { useAuth } from '../../hooks/auth'
import leticia from '../../assets/leticia.jpg'
import api from '../../services/api';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import {
  CreateAccountButton,
  CreateAccountButtonText,
  DetailsButton,
  DetailsButtonText
} from './styles';
interface Consulta {
  Consulta_id: string
  patient_name: string,
  doctor_name: string,
  patient_cpf: string,
  cobertura_name: string,
  time_date: string,
  expertise_name: string
}


const Dashboard: React.FC = () => {
  const navigation = useNavigation();
  const [consultas, setConsultas] = useState<Consulta[]>([])
  function AjusteData(data) {
    if (data === "") {
      return data
    }
    const date = new Date(data);
    const date_final = moment(date).format("DD/MM/YY hh:mm:ss");

    return (date_final)
    // return (`${dt}/${month}/${year}   ${hour}:${minute}`)
  }
  async function handleLikeRepository() {
  }
  useEffect(() => {
    try {
      api.get("consulta").then((response) => {
        setConsultas(response.data)
      })
    }
    catch (err) {
      Alert.alert(
        'Erro na autenticação',
        'Ocorreu um error ao fazer login, cheque as credenciais.',
      );
    }
  }, [navigation])

  const { signOut } = useAuth()

  return (
    <>
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.flatList}
          data={consultas}
          keyExtractor={(consulta) => consulta.Consulta_id}
          renderItem={({ item: consulta }) => (
            <View style={styles.repositoryContainer}>
              <>
                <Text style={styles.repository}>Consulta : {consulta.Consulta_id}</Text>
                <Text>Doutor: {consulta.doctor_name}</Text>
                <Text>Paciente: {consulta.patient_name}   CPF:  {consulta.patient_cpf}</Text>
                <Text>Cobertura: {consulta.cobertura_name} </Text>
                <Text></Text>
                <DetailsButton onPress={() => navigation.navigate('ConsultaDetalhada', {
                  consultaId: consulta.Consulta_id,
                  patient_name: consulta.patient_name,
                  doctor_name: consulta.doctor_name,
                  patient_cpf: consulta.patient_cpf,
                  cobertura_name: consulta.cobertura_name,
                  time_date: AjusteData(consulta.time_date),
                  expertise_name: consulta.expertise_name
                })}>
                  <Icon name="log-in" size={10} />
                  <DetailsButtonText>Detalhes</DetailsButtonText>
                </DetailsButton>
              </>
            </View>
          )}

        >

        </FlatList>

      </SafeAreaView>
      <CreateAccountButton onPress={() => navigation.navigate('CriarConsulta')}>
        <Icon name="log-in" size={20} />
        <CreateAccountButtonText>Criar uma consulta</CreateAccountButtonText>
      </CreateAccountButton>

    </>
  )
};
const styles = StyleSheet.create({
  container: {

    flex: 1,
    // backgroundColor: "#7159c1",
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

export default Dashboard;