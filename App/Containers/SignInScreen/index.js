import React, { Component } from 'react'
import {ImageBackground, TouchableOpacity} from 'react-native'
import {Container, Content, Form, Item, Input, Label, Button, Text} from 'native-base'
import { connect } from 'react-redux'
import Actions, { AuthSelectors } from '../../Redux/AuthRedux'
import background from '../../Images/background.jpg'

// Styles
import styles from './sheet'

class SignInScreen extends Component {
  state = {
   username: '',
   password: ''
  };

  componentWillReceiveProps(nextProps) {
    if(nextProps.isAuthorized !== this.props.isAuthorized && nextProps.isAuthorized) {
      this.props.navigation.navigate('App')
    }
  }

  changeHandler = (key) => (value) => this.setState({ [key]: value })

  render () {
    return (
      <ImageBackground style={styles.background} source={background} resizeMode="cover">
        <Container style={styles.container}>
          <Form>
            <Item stackedLabel>
              <Label style={{ color: '#fff' }}>Username</Label>
              <Input style={{ color: '#fff' }} onChangeText={this.changeHandler('username')} />
            </Item>
            <Item stackedLabel>
              <Label style={{ color: '#fff' }}>Password</Label>
              <Input style={{ color: '#fff' }} secureTextEntry onChangeText={this.changeHandler('password')} />
            </Item>
          </Form>
          <Button title='SignIn' onPress={() => this.props.signIn(this.state)} block style={{ margin: 15, marginTop: 50 }}>
            <Text>Sign In</Text>
          </Button>
          <TouchableOpacity style={{ margin: 15 }} onPress={() => this.props.navigation.navigate('SignUp')}>
            <Text style={{ color: '#fff' }}>Don't have account?</Text>
          </TouchableOpacity>
        </Container>
      </ImageBackground>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthorized: AuthSelectors.selectIsAuthorized(state),
})

export default connect(
  mapStateToProps,
  { signIn: Actions.signInRequest }
)(SignInScreen)
