import React, { Component } from 'react'
import { View } from 'react-native'
import {Body, Header, Icon, Left, Right, Title, Button as Btn, Content} from "native-base"

// Styles
import styles from './sheet'
import {FriendSelectors} from "../../Redux/FriendRedux";
import {connect} from "react-redux";
import BtnHeader from "../../Components/AddHeaderButton/index";
import ListUsers from "../../Components/ListUsers/index";

class FriendsScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Friends'
  };

  render () {
    const { friends } = this.props

    return (
      <View style={styles.container}>
        <Header>
          <Left>
            <Btn onPress={() => this.props.navigation.navigate('DrawerToggle')} transparent>
              <Icon name='menu' />
            </Btn>
          </Left>
          <Body>
          <Title>Friends</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <BtnHeader title='Add friends' onPress={() => this.props.navigation.navigate('AddFriend')}/>
          <ListUsers users={friends} />
        </Content>
      </View>
    )
  }
}
const mapStateToProps = (state) => ({
  friends: FriendSelectors.selectFriends(state)
})
export default connect(mapStateToProps)(FriendsScreen)
