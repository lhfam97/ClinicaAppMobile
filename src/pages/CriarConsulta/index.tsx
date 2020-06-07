import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, SafeAreaView, FlatList, StyleSheet, Alert, TouchableOpacity, Picker } from 'react-native';
import { useAuth } from '../../hooks/auth'
import leticia from '../../assets/leticia.jpg'
import api from '../../services/api';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

interface Time {
  time_date: string
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
    name: "A"
  });
  const [timeSelecionado, setTimeSelecionado] = useState<Time>({
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

  // useEffect(() => {
  //   try {
  //     api.get(`doctorTime/${medicoSelecionado.id}`).then((response) => {
  //       setDoctorTime(response.data);
  //       console.log(response.data)
  //     })
  //   }
  //   catch (err) {
  //     Alert.alert(
  //       'Erro na autenticação',
  //       'Ocorreu um error ao fazer login, cheque as credenciais.',
  //     );
  //   }
  // }, [medicoSelecionado])

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

        <Text>{medicoSelecionado.name}</Text>


      </View>
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
    width: 350
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