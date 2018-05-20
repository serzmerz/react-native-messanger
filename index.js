import './App/Config/ReactotronConfig'
import { AppRegistry, YellowBox } from 'react-native'
import App from './App/Containers/App'

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Warning: componentWillUpdate is deprecated'
])

XMLHttpRequest = GLOBAL.originalXMLHttpRequest ? GLOBAL.originalXMLHttpRequest : GLOBAL.XMLHttpRequest

AppRegistry.registerComponent('Hyper', () => App)
