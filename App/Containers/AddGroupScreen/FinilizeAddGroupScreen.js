import React, { Component } from 'react'
import {Image, TextInput, TouchableOpacity, View} from 'react-native'
import {Body, Header, Icon, Left, Right, Title, Button as Btn, Content, Text} from 'native-base'
import reactLogo from '../../Images/200px-React-icon.svg.png'
import GroupsActions, {GroupSelectors} from '../../Redux/GroupRedux'
import ImagePicker from 'react-native-image-crop-picker'

// Styles
import styles from './sheet'
import ListUsers from '../../Components/ListUsers/index'
import {FriendSelectors} from '../../Redux/FriendRedux'
import {connect} from 'react-redux'

class FinilizeAddGroupScreen extends Component {
  state = {
    name: '',
    icon: null,
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.groups + 1 === nextProps.groups) {
      this.props.navigation.navigate('GroupScreen')
    }
  }

  addGroupHandler = () => {
    const { params } = this.props.navigation.state
    this.props.addGroup({ ...this.state, userIds: params.selected  })
  }

  getIcon = () => {
    ImagePicker.openPicker({
      width: 100,
      height: 100,
      cropping: true,
      cropperCircleOverlay: true,
    }).then((file) => {
      this.setState({ icon: file });
    });
  }

  render () {
    const { params } = this.props.navigation.state
    return (
      <View style={styles.container}>
        <Header>
          <Left>
            <Btn onPress={() => this.props.navigation.goBack()} transparent>
              <Icon name='arrow-back' />
            </Btn>
          </Left>
          <Body>
            <Title>Create Group</Title>
          </Body>
          <Right>
            {this.state.name ? <Btn onPress={this.addGroupHandler} transparent>
              <Text>Create</Text>
            </Btn> : null }
          </Right>
        </Header>
        <Content>
          <View style={styles.detailsContainer}>
            <TouchableOpacity
              onPress={this.getIcon}
              style={styles.imageContainer}
            >
              <Image
                style={styles.groupImage}
                source={this.state.icon
                  ? { uri: this.state.icon.path}
                  :reactLogo
                }
              />
              <Text>edit</Text>
            </TouchableOpacity>
            <View style={styles.inputContainer}>
              <View style={styles.inputBorder}>
                <TextInput
                  autoFocus
                  onChangeText={name => this.setState({ name })}
                  placeholder='Group Subject'
                  underlineColorAndroid='transparent'
                  style={styles.input}
                />
              </View>
              <Text style={styles.inputInstructions}>
                {'Please provide a group subject and optional group icon'}
              </Text>
            </View>
          </View>
          <Text style={styles.participants}>
            {`participants: ${params.selected.length} of ${this.props.friendsCount}`.toUpperCase()}
          </Text>
          <ListUsers users={params.selected} />
        </Content>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  friendsCount: FriendSelectors.selectFriends(state).length,
  groups: GroupSelectors.selectGroups(state).length,
})
export default connect(mapStateToProps, { addGroup: GroupsActions.addGroupRequest })(FinilizeAddGroupScreen)
