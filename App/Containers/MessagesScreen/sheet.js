import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'flex-start'
  },
  loading: {
    justifyContent: 'center'
  },
  titleWrapper: {
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleImage: {
    marginRight: 6,
    width: 32,
    height: 32,
    borderRadius: 16
  },
  headerText: {
    fontSize: 17,
    color: '#fff',
    fontWeight: 'bold'
  }
})
