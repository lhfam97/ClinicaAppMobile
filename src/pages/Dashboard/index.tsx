import React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { useAuth } from '../../hooks/auth'
import leticia from '../../assets/leticia.jpg'
const Dashboard: React.FC = () => {
  const { signOut } = useAuth()
  return (
    <>
      <Text style={{ color: '#fff', fontSize: 26 }}>Seja bem Vinda Leticia</Text>
      <Image style={{ height: 320, width: 320 }} source={leticia} />
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Button title="sair" onPress={signOut} />
      </View>
    </>
  );
};

export default Dashboard;