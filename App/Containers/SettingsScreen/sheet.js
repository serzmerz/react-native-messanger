import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'flex-start'
  },
  email: {
    borderColor: '#777',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 16
  },
  emailHeader: {
    backgroundColor: '#dbdbdb',
    color: '#777',
    paddingHorizontal: 16,
    paddingBottom: 6,
    paddingTop: 32,
    fontSize: 12
  },
  loading: {
    justifyContent: 'center',
    flex: 1
  },
  userImage: {
    width: 54,
    height: 54,
    borderRadius: 27
  },
  imageContainer: {
    paddingRight: 20,
    alignItems: 'center'
  },
  input: {
    color: 'black'
  },
  inputBorder: {
    borderColor: '#dbdbdb',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    paddingVertical: 3
  },
  inputInstructions: {
    paddingTop: 6,
    color: '#777',
    fontSize: 12,
    flex: 1
  },
  userContainer: {
    paddingLeft: 16
  },
  userInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingRight: 16
  },
  wrapLogout: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'center'
  }
})
