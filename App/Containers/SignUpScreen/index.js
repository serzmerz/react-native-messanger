import React, { Component } from 'react'
import {Text, TouchableOpacity} from 'react-native'
import {Container, Content, Form, Item, Input, Label, Button} from 'native-base'
import { connect } from 'react-redux'
import Actions, { AuthSelectors } from '../../Redux/AuthRedux'

// Styles
import styles from './sheet'

class SignUpScreen extends Component {
  state = {
   username: '',
   password: ''
  };

  componentWillReceiveProps(nextProps) {
    if(nextProps.isLoading !== this.props.isLoading && !nextProps.isLoading) {
      this.props.navigation.navigate('SignIn')
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
          <Button title='SignUp' onPress={() => this.props.signUp(this.state)} block style={{ margin: 15, marginTop: 50 }}>
            <Text>Sign Up</Text>
          </Button>
          <TouchableOpacity style={{ margin: 15 }} onPress={() => this.props.navigation.navigate('SignIn')}>
            <Text>Don`t have account?</Text>
          </TouchableOpacity>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  isLoading: AuthSelectors.selectIsLoading(state),
})

export default connect(
  mapStateToProps,
  { signUp: Actions.signUpRequest }
)(SignUpScreen)
