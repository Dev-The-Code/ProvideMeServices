import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

import { Dimensions } from 'react-native';
import SettingScreen from '../screens/Setting';
const screenWidth = Dimensions.get('window').width;
const DrawerConfig = screenWidth * 0.8;

const MainNavigator = createDrawerNavigator(
  {
    SettingScreen: SettingScreen
  },
  {
    hideStatusBar: true,
    drawerBackgroundColor: 'rgba(255,255,255,.9)',
    overlayColor: '#6b52ae',
    contentOptions: {
      activeTintColor: '#fff',
      activeBackgroundColor: '#6b52ae',
    },
  },
  DrawerConfig
);

const DrawerNav = createAppContainer(MainNavigator);

export default DrawerNav;