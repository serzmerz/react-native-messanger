import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/index'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'flex-start'
  }
})
