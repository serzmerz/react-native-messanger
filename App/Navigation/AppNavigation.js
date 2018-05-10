import {StackNavigator, SwitchNavigator} from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen/index'
import SignInScreen from '../Containers/SignInScreen/index'
import AuthLoadingScreen from '../Containers/AuthLoadingScreen/index'

import styles from './Styles/NavigationStyles'
import SignUpScreen from '../Containers/SignUpScreen/index'

const routesAppStack = {
  LaunchScreen: {
    screen: LaunchScreen,
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

const AppStack = StackNavigator(routesAppStack)
const AuthStack = StackNavigator(routesAuthStack)

const PrimaryNav = SwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack
  },
  {
    headerMode: 'none',
    initialRouteName: 'AuthLoading',
    navigationOptions: {
      headerStyle: styles.header
    }
  }
)

export default PrimaryNav
