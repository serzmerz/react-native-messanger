import React, { Component } from 'react'
import {Text, Image, View, TouchableOpacity} from 'react-native'
import {GiftedChat, Actions, Bubble} from 'react-native-gifted-chat'
import reactLogo from '../../Images/200px-React-icon.svg.png'
import {connect} from "react-redux"
import Config from 'react-native-config'
import ImagePicker from 'react-native-image-crop-picker'

// Styles
import styles from './sheet'
import {Body, Header, Icon, Left, Right, Button as Btn} from "native-base";
import {AuthSelectors} from "../../Redux/AuthRedux";
import MessageActions, {MessageSelectors} from "../../Redux/MessageRedux";

class MessagesScreen extends Component {
  goToGroupDetails = () => {
    const { navigate, state } = this.props.navigation;
    navigate('GroupDetailsScreen', {
      id: state.params.groupId,
      title: state.params.title,
    });
  }

  onSend = (messages = []) => {
    this.props.addMessage(messages[0])
  }

  renderCustomActions = (props) => {
    const options = {
      'Select from gallery': () => {
        ImagePicker.openPicker({}).then(image => {
          props.onSend([{ image: image.path }])
        });
      },
      'Cancel': () => {},
    };
    return (
      <Actions
        {...props}
        options={options}
      />
    );
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#f0f0f0',
          }
        }}
      />
    );
  }

  render () {
    const { title, icon } = this.props.navigation.state.params
    const { user, messages } = this.props
    return (
      <View style={styles.container}>
        <Header>
          <Left>
            <Btn title='menu' onPress={() => this.props.navigation.goBack()} transparent>
              <Icon name='arrow-back' />
            </Btn>
          </Left>
          <Body style={{ justifyContent: 'center', paddingLeft: 40 }}>
          <TouchableOpacity
            style={styles.titleWrapper}
            onPress={this.goToGroupDetails}
          >
            <View style={styles.title}>
              <Image
                style={styles.titleImage}
                source={icon ? { uri: `${Config.API_URL}${icon}` } : reactLogo}
              />
              <Text style={styles.headerText}>{title}</Text>
            </View>
          </TouchableOpacity>
          </Body>
          <Right />
        </Header>
        <GiftedChat
          messages={messages}
          onSend={this.onSend}
          loadEarlier={false}
          user={user}
          renderActions={this.renderCustomActions}
          renderBubble={this.renderBubble}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  user: AuthSelectors.selectUser(state),
  messages: MessageSelectors.selectMessages(state),
  isLoading: MessageSelectors.selectIsLoading(state)
})

const mapDispatchToProps = {
  addMessage: MessageActions.addMessageRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesScreen)
