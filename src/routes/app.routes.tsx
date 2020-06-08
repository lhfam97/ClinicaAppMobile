// import React from 'react';

// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import Dashboard from '../pages/Dashboard';
// import CriarConsulta from '../pages/CriarConsulta';

// const Tab = createBottomTabNavigator();

// const AppRoutes: React.FC = () => (<Tab.Navigator
//   screenOptions={{
//     // headerShown: false,
//   }}>
//   <Tab.Screen name="Home" component={Dashboard} />
//   <Tab.Screen name="CriarConsulta" component={CriarConsulta} />
//   <Tab.Screen name="a" component={CriarConsulta} />
// </Tab.Navigator>
// )
// export default AppRoutes;
// function MyTabs() {
//   return (


//     <Tab.Navigator
//       screenOptions={{
//         // headerShown: false,
//       }}>
//       <Tab.Screen name="Home" component={Dashboard} />
//       <Tab.Screen name="Settings" component={CriarConsulta} />
//     </Tab.Navigator>
//   );
// }

// export default createAppContainer(myTabNavigator);
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
import CriarConsulta from '../pages/CriarConsulta';
import ConsultaDetalhada from '../pages/ConsultaDetalhada';
import RegistrarReceita from '../pages/RegistrarReceita';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      // headerShown: false,
      cardStyle: {
        backgroundColor: '#000030'
      },
    }}
  >
    <App.Screen name="Consultas" component={Dashboard} />
    <App.Screen name="CriarConsulta" component={CriarConsulta} />
    <App.Screen name="ConsultaDetalhada" component={ConsultaDetalhada} />
    <App.Screen name="RegistrarReceita" component={RegistrarReceita} />
  </App.Navigator>
);

export default AppRoutes;
