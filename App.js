import React from 'react';
import {createAppContainer, } from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import Home from './src/Home';
import Holidays from './src/Holidays';
import CustomDrawer from './src/CustonDrawer';
import AddMeeting from './src/AddMeeting';

const AppNavigator = createDrawerNavigator({
  Kokoukset: {
    screen: Home,
    navigationOptions: {
      title: "Kokoukset"
    }
  },
  Uusi: {
    screen: AddMeeting,
    navigationOptions: {
      title: "Lisää kokous"
    }
  },
  Lomat: {
    screen: Holidays,
    navigationOptions: {
      title: "Pyhäpäivät"
    }
  },
},
{
  initialRouteName: 'Kokoukset',
  contentComponent: CustomDrawer,
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle'
});

const AppContainer =  createAppContainer(AppNavigator);

export default function App() {

  return (
    <AppContainer />
  );
}