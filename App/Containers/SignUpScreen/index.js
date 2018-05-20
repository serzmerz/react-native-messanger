import React, { Component } from 'react'
import {ImageBackground, TouchableOpacity} from 'react-native'
import {Container, Content, Form, Item, Input, Label, Button, Text} from 'native-base'
import { connect } from 'react-redux'
import Actions, { AuthSelectors } from '../../Redux/AuthRedux'
import background from '../../Images/background.jpg'

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
          <Button title='SignUp' onPress={() => this.props.signUp(this.state)} block style={{ margin: 15, marginTop: 50 }}>
            <Text>Sign Up</Text>
          </Button>
          <TouchableOpacity style={{ margin: 15 }} onPress={() => this.props.navigation.navigate('SignIn')}>
            <Text style={{ color: '#fff' }}>Already have account?</Text>
          </TouchableOpacity>
      </Container>
      </ImageBackground>
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
