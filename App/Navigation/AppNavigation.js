import {StackNavigator, SwitchNavigator, DrawerNavigator} from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen/index'
import SignInScreen from '../Containers/SignInScreen/index'
import AuthLoadingScreen from '../Containers/AuthLoadingScreen/index'

import styles from './Styles/NavigationStyles'
import SignUpScreen from '../Containers/SignUpScreen/index'
import GroupScreen from '../Containers/GroupScreen/index'
import FriendsScreen from '../Containers/FriendsScreen/index'
import AddFriendScreen from '../Containers/AddFriendScreen/index'
import AddGroupScreen from '../Containers/AddGroupScreen/index'
import FinilizeAddGroupScreen from '../Containers/AddGroupScreen/FinilizeAddGroupScreen'
import SettingsScreen from '../Containers/SettingsScreen/index'
import MessagesScreen from '../Containers/MessagesScreen/index'
import GroupDetailsScreen from '../Containers/GroupDetailsScreen/index'

const routesAppStack = {
  GroupScreen: {
    screen: GroupScreen,
    title: 'Home',
    sagas: require('../Containers/GroupScreen/sagas')
  },
  FriendsScreen: {
    screen: FriendsScreen,
    title: 'Friends',
    sagas: require('../Containers/FriendsScreen/sagas')
  },
  AddGroupScreen: {
    screen: AddGroupScreen,
    title: 'Create Group',
    sagas: require('../Containers/AddGroupScreen/sagas')
  },
  SettingsScreen: {
    screen: SettingsScreen,
    title: 'Settings',
    sagas: require('../Containers/SettingsScreen/sagas')
  },
  LaunchScreen: {
    screen: LaunchScreen,
    title: 'Launch',
    sagas: require('../Containers/LaunchScreen/sagas')
  }
}

const routesAuthStack = {
  SignIn: {
    screen: SignInScreen,
    sagas: require('../Containers/SignInScreen/sagas')
  },
  SignUp: {
    screen: SignUpScreen,
    sagas: require('../Containers/SignUpScreen/sagas')
  }
}

const AppStack = DrawerNavigator(routesAppStack)

const routesMainStack = {
  AddFriend: {
    screen: AddFriendScreen,
    sagas: require('../Containers/AddFriendScreen/sagas')
  },
  FinilizeAddGroupScreen: {
    screen: FinilizeAddGroupScreen,
    sagas: require('../Containers/AddGroupScreen/sagas')
  },
  MessagesScreen: {
    screen: MessagesScreen,
    sagas: require('../Containers/MessagesScreen/sagas')
  },
  GroupDetailsScreen: {
    screen: GroupDetailsScreen,
    sagas: require('../Containers/GroupDetailsScreen/sagas')
  }
}

export const routesByScreen = {
  ...routesAppStack,
  ...routesAuthStack,
  ...routesMainStack
}

const MainStack = StackNavigator({
  Main: AppStack,
  ...routesMainStack
}, {
  headerMode: 'none'
})
const AuthStack = StackNavigator(routesAuthStack)

const PrimaryNav = SwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: MainStack,
    Auth: AuthStack
  },
  {
    headerMode: 'screen',
    initialRouteName: 'AuthLoading',
    navigationOptions: {
      headerStyle: styles.header
    }
  }
)

export default PrimaryNav
