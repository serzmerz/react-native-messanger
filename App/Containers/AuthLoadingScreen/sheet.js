import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/index'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
