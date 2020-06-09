import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  Image,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useAuth } from '../../hooks/auth';
import leticia from '../../assets/leticia.jpg';
import api from '../../services/api';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import {
  CreateAccountButton,
  CreateAccountButtonText,
  DetailsButton,
  DetailsButtonText,
} from './styles';
interface Receita {
  id: string;
  consulta_id: string;
  descricao: string;
}

const ReceitaMedica: React.FC = ({ route }) => {
  const navigation = useNavigation();
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const { consultaId, doctor_name, patient_name } = route.params;
  useEffect(() => {
    try {
      api.get(`exames/${consultaId}`).then((response) => {
        setReceitas(response.data);
      });
    } catch (err) {
      Alert.alert(
        'Erro na autenticação',
        'Ocorreu um error ao fazer chamada na api, cheque o servidor.',
      );
    }
  }, [navigation]);

  const { signOut } = useAuth();

  return (
    <>
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.flatList}
          data={receitas}
          keyExtractor={(receitas) => receitas.id}
          renderItem={({ item: receita }) => (
            <View style={styles.repositoryContainer}>
              <>
                <Text style={styles.repository}>
                  Receita : {receita.id}
                </Text>
                <Text> Paciente: {patient_name}</Text>
                <Text> </Text>
                <Text> {receita.descricao}</Text>
                <Text style={{ translateY: 150 }}> Doutor: {doctor_name}</Text>
              </>
            </View>
          )}
        />
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    height: 300,
    marginTop: 20,
    marginHorizontal: 15,
    backgroundColor: '#fff',
    padding: 10,
  },
  repository: {
    margin: 0,
    fontSize: 11,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#fff',
    backgroundColor: '#7159c1',
    padding: 15,
  },
  flatList: {
    marginBottom: 100,
  },
});

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

export default ReceitaMedica;
