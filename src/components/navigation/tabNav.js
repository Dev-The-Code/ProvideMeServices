import * as React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Image } from 'react-native';
import ChatInbox from '../screens/chatInbox';
import Reportscreen from '../screens/Reports';
import Homescreen from '../screens/Home';
import Options from '../screens/Options';


const activeHome = <Image source={require('../icons/home-active.png')} style={{ width: 26, height: 26 }} />
const inactiveHome = <Image source={require('../icons/home-inactive.png')} style={{ width: 26, height: 26 }} />
const activeChat = <Image source={require('../icons/chat-active.png')} style={{ width: 26, height: 26 }} />
const inactiveChat = <Image source={require('../icons/chat-inactive.png')} style={{ width: 26, height: 26 }} />
const activeReports = <Image source={require('../icons/reports-active.png')} style={{ width: 26, height: 26 }} />
const inactiveReports = <Image source={require('../icons/reports-inactive.png')} style={{ width: 26, height: 26 }} />
const activeMore = <Image source={require('../icons/more-active.png')} style={{ width: 26, height: 26 }} />
const inactiveMore = <Image source={require('../icons/more-inactive.png')} style={{ width: 26, height: 26 }} />

function getData() {
  console.log('Chat Screen Function Called Success')
}


const MainNavigator = createBottomTabNavigator({

  Homescreen: {
    screen: Homescreen,
    navigationOptions: {
      tabBarIcon: (navigation) => {
        const forFocused = navigation.focused;
        const renderHome = forFocused ? activeHome : inactiveHome;
        return (
          renderHome
        )
      }
    }
  },
  Chatscreen: {
    screen: ChatInbox,
    navigationOptions: {
      tabBarIcon: (navigation) => {
        const forFocused = navigation.focused;
        const renderChat = forFocused ? activeChat : inactiveChat;
        return (
          renderChat
        )
      }
    },
  },
  Reportscreen: {
    screen: Reportscreen,
    navigationOptions: {
      tabBarIcon: (navigation) => {
        const forFocused = navigation.focused;
        const renderReports = forFocused ? activeReports : inactiveReports;
        return (
          renderReports
        )
      }
    }
  },
  Options: {
    screen: Options,
    navigationOptions: {
      headerStyle: {
        elevation: 0
      },
      tabBarIcon: (navigation) => {
        const forFocused = navigation.focused;
        const renderMore = forFocused ? activeMore : inactiveMore;
        return (
          renderMore
        )
      }
    },
  },

},
  {
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      tabStyle: {
        backgroundColor: '#fff',
      },
      style: {
        backgroundColor: '#fff'
      },
      labelStyle: {
        fontSize: 12,
        padding: 2
      }
    }
  }
);

const BottomTabe = createAppContainer(MainNavigator);
export default BottomTabe;

