import React, { Component } from 'react'
import {ScrollView, Text, Image, View, TouchableOpacity} from 'react-native'
import reactLogo from '../../Images/200px-React-icon.svg.png'

// Styles
import styles from './sheet'
import {Body, Header, Icon, Left, Right, Title, Button as Btn} from "native-base";

export default class MessagesScreen extends Component {
  goToGroupDetails = () => {
    const { navigate, state } = this.props.navigation;
    navigate('GroupDetailsScreen', {
      id: state.params.groupId,
      title: state.params.title,
    });
  }

  render () {
    const { title, icon } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <Header>
          <Left>
            <Btn title='menu' onPress={() => this.props.navigation.goBack()} transparent>
              <Icon name='arrow-back' />
            </Btn>
          </Left>
          <Body style={{ justifyContent: 'center' }}>
          <TouchableOpacity
            style={styles.titleWrapper}
            onPress={this.goToGroupDetails}
          >
            <View style={styles.title}>
              <Image
                style={styles.titleImage}
                source={icon ? { uri: icon } : reactLogo}
              />
              <Text style={styles.headerText}>{title}</Text>
            </View>
          </TouchableOpacity>
          </Body>
          <Right />
        </Header>
      </View>
    )
  }
}
