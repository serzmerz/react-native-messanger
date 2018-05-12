import React, { Component } from 'react'
import { View } from 'react-native'
import {Body, Header, Icon, Left, Right, Title, Button as Btn, Content, Text} from 'native-base'

// Styles
import styles from './sheet'
import {connect} from 'react-redux'
import SelectedUserList from "./Components/SelectedUserList";
import ListUsers from "../../Components/ListUsers/index";
import {FriendSelectors} from "../../Redux/FriendRedux";

class AddGroupScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Create Group',
  }
  state = {
    selected: []
  }

  addToSelected = (item) => () => {
    if (this.state.selected.indexOf(item) === -1) {
      this.setState({selected: [...this.state.selected, item]})
    }
  }

  removeFromSelected = (item) => (
    this.setState({
      selected: this.state.selected.filter(user => user.id !== item.id)
    })
  )

  render () {
    const { selected } = this.state
    return (
      <View style={styles.container}>
        <Header>
          <Left>
            <Btn onPress={() => this.props.navigation.navigate('DrawerToggle')} transparent>
              <Icon name='menu' />
            </Btn>
          </Left>
          <Body>
            <Title>Create Group</Title>
          </Body>
          <Right>
            {selected.length ? (
              <Btn onPress={() => this.props.navigation.navigate('FinilizeAddGroupScreen', { selected })} transparent>
                <Text>Next</Text>
              </Btn>
            ) : null}
          </Right>
        </Header>
        <Content>
          {selected.length ? (
            <View style={styles.selected}>
              <SelectedUserList
                data={selected}
                remove={this.removeFromSelected}
              />
            </View>
          ): null}
          <Text style={styles.text}>Select users from list:</Text>
          <ListUsers users={this.props.friends} onPress={this.addToSelected} />
        </Content>
      </View>
    )
  }
}
const mapStateToProps = (state) => ({
  friends: FriendSelectors.selectFriends(state)
})
export default connect(mapStateToProps)(AddGroupScreen)
