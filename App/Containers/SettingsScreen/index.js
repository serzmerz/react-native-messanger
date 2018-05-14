import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Text,
  View,
  Button, TouchableOpacity, Image, TextInput, AsyncStorage
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { connect } from 'react-redux';
import {compose} from "redux";
import styles from './sheet';
import {Body, Header, Icon, Left, Right, Title, Button as Btn, Text as Txt} from "native-base";
import reactLogo from '../../Images/200px-React-icon.svg.png';
import AuthActions, {AuthSelectors} from "../../Redux/AuthRedux";
import Config from 'react-native-config'


class Settings extends Component {

  static navigationOptions = {
    drawerLabel: 'Settings',
  };


  constructor(props) {
    super(props)
    this.state = {
      avatar: null,
      username: null,
    }
  }

  getAvatar = () => {
    ImagePicker.openPicker({
      width: 100,
      height: 100,
      cropping: true,
      cropperCircleOverlay: true,
    }).then((file) => {
      this.setState({ avatar: file });
    });
  }

  logout = () => {
    AsyncStorage.clear()
    this.props.logout()
    this.props.navigation.navigate('Auth')
  }

  updateUser = () => {
    this.props.updateUser(this.state)
  }

  render() {
    const { user } = this.props
    const { username, avatar } = this.state
    return (
      <View style={styles.container}>
        <Header>
          <Left>
            <Btn onPress={() => this.props.navigation.navigate('DrawerToggle')} transparent>
              <Icon name='menu' />
            </Btn>
          </Left>
          <Body>
          <Title>Settings</Title>
          </Body>
          <Right>
            {username || avatar ? <Btn onPress={this.updateUser} transparent>
              <Txt>Update</Txt>
            </Btn> : null}
          </Right>
        </Header>
        <View style={styles.userContainer}>
          <View style={styles.userInner}>
            <TouchableOpacity style={styles.imageContainer} onPress={this.getAvatar}>
              <Image
                style={styles.userImage}
                source={
                  avatar
                    ? { uri: avatar.path}
                    : (user.image ? { uri: `${Config.API_URL}${user.image}`} : reactLogo)
                }
                cache={'force-cache'}
              />
              <Text>edit</Text>
            </TouchableOpacity>
            <Text style={styles.inputInstructions}>
              Enter your name and add an optional profile picture
            </Text>
          </View>
          <View style={styles.inputBorder}>
            <TextInput
              onChangeText={username => this.setState({ username })}
              placeholder={user.username}
              style={styles.input}
              defaultValue={user.username}
              underlineColorAndroid='transparent'
            />
          </View>
        </View>
        <View style={styles.wrapLogout}>
          <Button title={'Logout'} onPress={this.logout} />
        </View>
      </View>
    );
  }
}
Settings.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

const mapStateToProps = (state) => ({
  user: AuthSelectors.selectUser(state)
});

export default compose(
  connect(
    mapStateToProps,
    { updateUser: AuthActions.updateUserRequest, logout: AuthActions.logout }
    ),
)(Settings);
