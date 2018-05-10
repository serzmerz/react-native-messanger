import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, ActivityIndicator, AsyncStorage } from 'react-native'
import Actions  from '../../Redux/AuthRedux'

// Styles
import styles from './sheet'
import {connect} from "react-redux";

class AuthLoadingScreen extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired
    })
  }

  constructor(props) {
    super (props)
    this._bootstrapAsync()
  }

  _bootstrapAsync = async () => {
    try {
      AsyncStorage.getItem('auth').then(persist => {
        if(persist) this.props.signIn(JSON.parse(persist))
        this.props.navigation.navigate(persist ? 'App' : 'Auth')
      })
    } catch (e) {
      console.log(e)
    }
  };

  render () {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    )
  }
}

export default connect(
  null,
  { signIn: Actions.signInSuccess }
)(AuthLoadingScreen)
