import React, { useState, useEffect } from 'react';
import { View, Text, Image, SafeAreaView, FlatList, StyleSheet, Alert, TouchableOpacity, Picker } from 'react-native';
import { useAuth } from '../../hooks/auth'
import leticia from '../../assets/leticia.jpg'
import api from '../../services/api';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import Button from '../../components/Button';
import AsyncStorage from '@react-native-community/async-storage';

interface Time {
  time_date: string,
  DoctorTime_id: string
}
interface Doctor {
  id: string,
  name: string
}


const CriarConsulta: React.FC = () => {
  const navigation = useNavigation();

  // const state = {
  //   escolaridade: ''
  // }
  const [medicos, setMedicos] = useState<Doctor[]>([]);
  const [doctorTime, setDoctorTime] = useState<Time[]>([]);
  const [medicoSelecionado, setMedicoSelecionado] = useState<Doctor>({
    id: "1",
    name: ""
  });
  const [timeSelecionado, setTimeSelecionado] = useState<Time>({
    DoctorTime_id: "",
    time_date: ""
  });


  useEffect(() => {
    try {
      api.get("doctors").then((response) => {
        setMedicos(response.data)
      })
    }
    catch (err) {
      Alert.alert(
        'Erro na autenticação',
        'Ocorreu um error ao fazer login, cheque as credenciais.',
      );
    }
  }, [])

  useEffect(() => {
    try {
      api.get(`doctorTime/${medicoSelecionado.id}`).then((response) => {
        setDoctorTime(response.data);
        // console.log(response.data)
      })
    }
    catch (err) {
      Alert.alert(
        'Erro na autenticação',
        'Ocorreu um error ao fazer login, cheque as credenciais.',
      );
    }
  }, [medicoSelecionado])
  async function algumaCoisa() {
    try {
      console.log(timeSelecionado.DoctorTime_id)
      const response = await api.post('consulta', {

        doctor_time_id: timeSelecionado.DoctorTime_id,
        cobertura_id: 'f2e6ddb0-2df3-4d62-8883-df4a7065e48c',
        patient_id: '057be026-41e0-4c52-bd03-ad9579edb082'
      });
      Alert.alert(
        'Cadastro de Consulta realizado com sucesso!',
        'Você ja pode visualiza-la na aplicação.',
      );
      navigation.goBack();
    }
    catch (err) {
      console.log(err)
      Alert.alert(
        'Erro na cadastro de Consulta',
        'Ocorreu um error ao fazer cadastro da consulta, tente novamente.',
      );
    }
  }


  function AjusteData(data) {
    if (data === "") {
      return data
    }
    const date = new Date(data);
    const date_final = moment(date).format("DD/MM/YY hh:mm:ss");

    return (date_final)
    // return (`${dt}/${month}/${year}   ${hour}:${minute}`)
  }
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
  // }, [])

  // const { signOut } = useAuth()

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.cabecalho}>Selecione o médico e o horario para agendar sua consulta</Text>
        <Picker
          style={styles.pickerComponent}
          mode="dropdown"
          selectedValue={medicoSelecionado}
          // selectedValue={this.state.selected}
          onValueChange={
            (value) => {
              setMedicoSelecionado(
                value
              )
              setTimeSelecionado(
                {
                  DoctorTime_id: "",
                  time_date: ""
                }
              )
              // console.log(value)


            }
          }
        >
          <Picker.Item
            label="Selecione os Medicos" value="A">

          </Picker.Item>

          {medicos.map((item, index) => {
            return (
              <Picker.Item label={item.name} value={item} key={index} />

            )
          })}

          {/* <Picker.Item
            label="Escolha os lindos" value="">

          </Picker.Item>
          <Picker.Item
            label="Luique" value="Luique">

          </Picker.Item>
          <Picker.Item
            label="Leticia" value="Leticia">

          </Picker.Item> */}
        </Picker>

        <Text style={{ color: "#fff" }}>{medicoSelecionado.name}</Text>

        <Picker
          style={styles.pickerComponent}
          itemStyle={styles.pickerItem}
          mode="dropdown"
          selectedValue={timeSelecionado}
          // selectedValue={this.state.selected}
          onValueChange={
            (value) => {
              setTimeSelecionado(
                value
              )

              console.log(value)
            }
          }
        >
          <Picker.Item
            label="Selecione o Horario" value="">

          </Picker.Item>

          {doctorTime.map((item, index) => {
            return (

              <Picker.Item label={AjusteData(item.time_date)} value={item} key={index} />
              // < Picker.Item
              //   label = { medico.name } value = { medico } >

              // </Picker.Item>
            )
          })}

        </Picker>
        <Text style={{ color: "#fff" }}>{AjusteData(timeSelecionado.time_date)}</Text>
      </View>
      <Button onPress={() => algumaCoisa()}>
        Criar Consulta
              </Button>
      {/* <SafeAreaView style={styles.container}>
        <FlatList

          data={consultas}
          keyExtractor={(consulta) => consulta.Consulta_id}
          renderItem={({ item: consulta }) => (
            <View style={styles.repositoryContainer}>
              <>
                <Text style={styles.repository}>Consulta : {consulta.Consulta_id}</Text>
                <Text>Doutor: {consulta.doctor_name}</Text>
                <Text>Paciente: {consulta.patient_name}   CPF:  {consulta.patient_cpf}</Text>
                <Text>Cobertura: {consulta.cobertura_name} </Text>
              </>
            </View>
          )}
        ></FlatList>

      </SafeAreaView> */}


    </>
  )
};
const styles = StyleSheet.create({
  container: {

    flex: 1,
    alignItems: "center"
    // backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginTop: 20,
    marginBottom: 10,
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
  pickerComponent: {
    backgroundColor: '#fff',
    marginTop: 20,
    width: 350
  },
  pickerItem: {
    backgroundColor: "grey", color: "blue"
  },
  cabecalho: {
    fontSize: 24,
    padding: 20,
    marginTop: 50,
    marginBottom: 80,
    color: "#fff"
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

export default CriarConsulta;
{/* <Picker
style={styles.pickerComponent}
mode="dropdown"
selectedValue={timeSelecionado.time_date}
// selectedValue={this.state.selected}
onValueChange={
  (itemValor, itemIndex) => {
    setTimeSelecionado(
      itemValor
    )

    console.log(itemValor)
  }
}
>
{/* <Picker.Item
  label="Selecione os Medicos" value="">

</Picker.Item> */}

// {doctorTime.map((item, index) => {
//   return (

//     <Picker.Item label={item.time_date} value={item} key={index} />
//     // < Picker.Item
//     //   label = { medico.name } value = { medico } >

//     // </Picker.Item>
//   )
// })}

// </Picker> */}