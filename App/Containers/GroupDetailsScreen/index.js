import React, { Component } from 'react'
import {ActivityIndicator, Button, FlatList, Image, TextInput, TouchableOpacity, View} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import {Body, Header, Icon, Left, Right, Title, Button as Btn, Text} from 'native-base'
import Config from 'react-native-config'
import reactLogo from '../../Images/200px-React-icon.svg.png'
import GroupActions, {GroupSelectors} from '../../Redux/GroupRedux'
import {connect} from "react-redux";

// Styles
import styles from './sheet'

class GroupDetailsScreen extends Component {
  state = {
    icon: null,
    name: null,
  }

  componentWillReceiveProps (nextProps) {
    if(!nextProps.group) {
      // this.props.navigation.navigate('GroupScreen')
      // TODO redirect
    }
  }

  getIcon = () => {
    ImagePicker.openPicker({
      width: 100,
      height: 100,
      cropping: true,
      cropperCircleOverlay: true,
    }).then((icon) => {
      this.setState({ icon });
    });
  }

  onChangeText = (name) => {
    this.setState({ name });
  }

  removeGroup = () => this.props.removeGroup({ id: this.props.group.id })

  leaveGroup = () => this.props.leaveGroup({ id: this.props.group.id })

  updateGroup = () => {
    const { id } = this.props.group;
    this.props.updateGroup({ id, ...this.state });
  }

  keyExtractor = item => item.id;

  headerComponent = () => {
    const { group } = this.props;
    const { icon } = this.state;
    return (
      <View>
        <View style={styles.detailsContainer}>
          <TouchableOpacity style={styles.groupImageContainer} onPress={this.getIcon}>
            <Image
              style={styles.groupImage}
              source={
                icon
                  ? { uri: icon.path}
                  : (group.icon ? { uri: `${Config.API_URL}${group.icon}`} : reactLogo)
              }
              cache={'force-cache'}
            />
            <Text>edit</Text>
          </TouchableOpacity>
          <View style={styles.groupNameBorder}>
            <TextInput
              onChangeText={this.onChangeText}
              placeholder={group.name}
              style={styles.groupName}
              defaultValue={group.name}
              underlineColorAndroid='transparent'
            />
          </View>
        </View>
        <Text style={styles.participants}>
          {`participants: ${group.Users.length}`.toUpperCase()}
        </Text>
      </View>
    );
  }

  renderItem = ({ item: user }) => (
    <View style={styles.user}>
      <Image
        style={styles.avatar}
        source={user.image ? { uri: `${Config.API_URL}${user.image}`} : reactLogo}
        cache={'force-cache'}
      />
      <Text style={styles.username}>{user.username}</Text>
    </View>
  )

  renderHeader = () => {
    const { name, icon } = this.state;
    return (
      <Header>
        <Left>
          <Btn title='menu' onPress={() => this.props.navigation.goBack()} transparent>
            <Icon name='arrow-back' />
          </Btn>
        </Left>
        <Body>
        <Title>{this.props.navigation.state.params.title}</Title>
        </Body>
        <Right>
          {name || icon ? <Btn onPress={this.updateGroup} transparent>
            <Text>Update</Text>
          </Btn> : null}
        </Right>
      </Header>
    )
  }

  render () {
    const { group, loading } = this.props;

    // render loading placeholder while we fetch messages
    if (!group || loading) {
      return (
        <View style={[styles.loading, styles.container]}>
          {this.renderHeader()}
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <FlatList
          data={group.Users}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          ListHeaderComponent={this.headerComponent}
          ListFooterComponent={() => (
            <View style={styles.wrapButtons}>
              <View style={styles.button}><Button title={'Leave Group'} onPress={this.leaveGroup} /></View>
              <View style={styles.button}><Button title={'Delete Group'} onPress={this.removeGroup} /></View>
            </View>
          )}
        />
      </View>
    );
  }
}
const mapStateToProps = (state, props) => ({
  loading: GroupSelectors.selectIsLoading(state),
  group: GroupSelectors.selectGroup(state, props.navigation.state.params.id)
})

const mapDispatchToProps = {
  updateGroup: GroupActions.updateGroupRequest,
  leaveGroup: GroupActions.leaveGroupRequest,
  removeGroup: GroupActions.removeGroupRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupDetailsScreen)
