import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'flex-start'
  },
  loading: {
    justifyContent: 'center',
    flex: 1
  },
  groupContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  groupName: {
    fontWeight: 'bold',
    flex: 0.7
  },
  groupTextContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 6
  },
  groupText: {
    color: '#8c8c8c'
  },
  groupImage: {
    width: 54,
    height: 54,
    borderRadius: 27
  },
  groupTitleContainer: {
    flexDirection: 'row'
  },
  groupLastUpdated: {
    flex: 0.3,
    color: '#8c8c8c',
    fontSize: 11,
    textAlign: 'right'
  },
  groupUsername: {
    paddingVertical: 4
  },
  groupTextInnerContainer: {
    flexDirection: 'row',
    flex: 1,
    paddingRight: 6,
    alignItems: 'center'
  },
  groupBadge: {
    borderRadius: 20,
    backgroundColor: '#037aff',
    justifyContent: 'center',
    paddingHorizontal: 5,
    paddingVertical: 2
  },
  groupBadgeText: {
    color: 'white',
    textAlign: 'center'
  },
  header: {
    alignItems: 'flex-end',
    padding: 6,
    borderColor: '#eee',
    borderBottomWidth: 1
  },
  warning: {
    textAlign: 'center',
    padding: 12
  },
  column: {
    flexDirection: 'column',
    flex: 1
  }
})
