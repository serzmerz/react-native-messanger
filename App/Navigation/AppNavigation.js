import {StackNavigator, SwitchNavigator, DrawerNavigator} from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen/index'
import SignInScreen from '../Containers/SignInScreen/index'
import AuthLoadingScreen from '../Containers/AuthLoadingScreen/index'

import styles from './Styles/NavigationStyles'
import SignUpScreen from '../Containers/SignUpScreen/index'
import GroupScreen from '../Containers/GroupScreen'

const routesAppStack = {
  GroupScreen: {
    screen: GroupScreen,
    title: 'Home',
    sagas: require('../Containers/GroupScreen/sagas')
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

export const routesByScreen = {
  ...routesAppStack,
  ...routesAuthStack
}

const AppStack = DrawerNavigator(routesAppStack)
const AuthStack = StackNavigator(routesAuthStack)

const PrimaryNav = SwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
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
