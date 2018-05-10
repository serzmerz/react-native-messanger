import React, { Component } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import {Container, Content, Form, Item, Input, Label, Button} from 'native-base'
import { connect } from 'react-redux'
import Actions, { AuthSelectors } from '../../Redux/AuthRedux'

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
      <Container>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Username</Label>
              <Input onChangeText={this.changeHandler('username')} />
            </Item>
            <Item stackedLabel last>
              <Label>Password</Label>
              <Input secureTextEntry onChangeText={this.changeHandler('password')} />
            </Item>
          </Form>
          <Button title='SignIn' onPress={() => this.props.signIn(this.state)} block style={{ margin: 15, marginTop: 50 }}>
            <Text>Sign In</Text>
          </Button>
          <TouchableOpacity style={{ margin: 15 }} onPress={() => this.props.navigation.navigate('SignUp')}>
            <Text>Already have account?</Text>
          </TouchableOpacity>
        </Content>
      </Container>
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
