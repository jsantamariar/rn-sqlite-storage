import { NavigationContainer, NavigationProp, useNavigation } from '@react-navigation/native';
import NewProduct from './app/screens/NewProduct';
import Home from './app/screens/Home';
import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack';
import Products from './app/screens/Products';
import { StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type RootStackNavigatorParamList = {
  Products: undefined;
  Details: { id: string };
  Modal: undefined;
}

export type StackNavigation = NavigationProp<RootStackNavigatorParamList>;

export type ProductsPageProps = NativeStackScreenProps<RootStackNavigatorParamList, 'Products'>;
export type DetailsPageProps = NativeStackScreenProps<RootStackNavigatorParamList, 'Details'>;
export type ModalPageProps = NativeStackScreenProps<RootStackNavigatorParamList, 'Modal'>;

const RootStack = createNativeStackNavigator<RootStackNavigatorParamList>();

const RootStackNavigation = () => {
  const navigation = useNavigation<StackNavigation>();

  return (
    <RootStack.Navigator>
      <RootStack.Screen name="Products" component={Home} options={{
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Modal')}>
            <Ionicons name="add" size={24} color="black" />
          </TouchableOpacity>
        )
      }} />
      <RootStack.Screen name="Details" component={Products} />
      <RootStack.Screen name="Modal" component={NewProduct} options={{ presentation: 'modal' }} />
    </RootStack.Navigator>
  )
}

export default function App() {

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <NavigationContainer>
        <RootStackNavigation />
      </NavigationContainer>
    </>
  );
}


