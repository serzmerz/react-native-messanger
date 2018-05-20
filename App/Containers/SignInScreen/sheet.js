import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/index'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  background: {
    flex: 1,
    width: null,
    height: null
  },
  container: {
    justifyContent: 'center',
    paddingHorizontal: 20
  }
})
