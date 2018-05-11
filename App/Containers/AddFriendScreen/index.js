import React, { Component } from 'react'
import { View, Button as Btn, Alert } from 'react-native'
import { Container, Header, Item, Input, Icon, Button, Text } from 'native-base'
import debounce from 'lodash/debounce'
import FriendActions, { FriendSelectors } from '../../Redux/FriendRedux'

// Styles
import styles from './sheet'
import {connect} from "react-redux";
import ListUsers from "../../Components/ListUsers/index";

class AddFriend extends Component {
  state = {
    text: ''
  }

  changeText = (text) => {
    this.setState({ text }, () => this.sendSearchRequest(text))
  }

  sendSearchRequest = debounce(value => {
    this.props.searchFriends(value)
  }, 200)

  showAlert = (friend) => () => (
    Alert.alert(
      'Do you want to add this user to friends list? ',
      '',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () => this.props.addFriend(friend)},
      ],
      { cancelable: true }
    )
  )

  render () {
    return (
      <View style={styles.container}>
        <Container>
          <Header searchBar rounded>
            <Item>
              <Icon name='ios-search' />
              <Input placeholder='Search' onChangeText={this.changeText} />
              <Icon name='ios-people' />
            </Item>
            <Button transparent>
              <Text>Search</Text>
            </Button>
          </Header>
          <View style={styles.header}>
            <Btn title='Back' onPress={() => this.props.navigation.goBack()} />
          </View>
          <ListUsers users={this.props.friends} onPress={this.showAlert}/>
        </Container>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  friends: FriendSelectors.selectSearchFriends(state)
})

const mapDispatchToProps = {
  searchFriends: FriendActions.getFriendsRequest,
  addFriend: FriendActions.addFriendRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(AddFriend)
