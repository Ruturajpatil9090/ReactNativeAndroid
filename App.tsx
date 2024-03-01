import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import UserCreation from './Components/UserCreation';
import FlatCards from "./Components/SelfStock/SelfStockUtility";
import Home from "./Pages/HomeCompoent"
import LotwisePNL from "./Components/PNL/LotwisePNL";
import ManagementAnalysis from "./Components/TodaysAnalysis/TodaysAnalysis"
import Login from "./Pages/LoginComponent"
import MonthlyDispatch from "./Components/MonthyDispatch/MonthlyDispatch"
import MOnthlyDetailDispatch from "./Components/MonthyDispatch/MonthlyDetailDispatch"
import SelfStockTenderPurchase from './Components/SelfStock/SelfStockTenderPurchase';
import CompanyList from "./Pages/CompanyList"

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{
        
        headerTitleAlign: 'center',
      }}>

        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="companylist" component={CompanyList} options={{ title: 'Company List' }} />
        <Stack.Screen name="Home" component={Home} options={{ title: 'Navkar Traders' }} />
        <Stack.Screen name="SelfStock" component={FlatCards} options={{ title: 'Self Stock Utility' }} />
        <Stack.Screen name="LOTWISEPNL" component={LotwisePNL}  options={{ title: 'Lot Wise PNL' }} />
        <Stack.Screen name="TodaysAnalysis" component={ManagementAnalysis}  options={{ title: 'Todays Analysis' }}  />
        <Stack.Screen name="monthlydispatch" component={MonthlyDispatch}  options={{ title: 'Dispatch Analysis' }} />
        <Stack.Screen name="Monthlydetaildispatch" component={MOnthlyDetailDispatch} options={{ title: 'Monthly Dispatch Analysis' }}  />
        <Stack.Screen name="SelfStockTenderPurchase" component={SelfStockTenderPurchase} options={{ title: 'Tender Purchase' }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

