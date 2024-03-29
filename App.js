import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import AppLoading from 'expo-app-loading';


import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import PlaceDetails from './screens/PlaceDetails';
import { Colors } from './constants/colors';
import IconButton from './components/UI/IconButton';
import Map from './screens/Map';
import { init } from './util/database';


const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInitialized, setDbInitializes] = useState(false);

  useEffect(() => {
    init().then(() => {
      setDbInitializes(true);
    }).catch(err => {
      console.log(err);
    });
  }, []);

  if (!dbInitialized) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar style='dark' />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: { backgroundColor: Colors.primary500 },
          headerTintColor: Colors.gray700,
          contentStyle: { backgroundColor: Colors.gray700 }
        }}>
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: 'Your Favorite Places',
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="add"
                  size={24}
                  color={tintColor}
                  onPress={() => navigation.navigate('AddPlace')}
                />
              ),
            })}
          />
          <Stack.Screen name="AddPlace" component={AddPlace} options={{
            title: 'Add New Place'
          }} />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen name="PlaceDetails" component={PlaceDetails} options={{
            title: 'Loading Place...'
          }}/>
        </Stack.Navigator>

      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({

});
