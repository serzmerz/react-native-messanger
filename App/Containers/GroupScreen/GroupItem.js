import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Image,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import moment from 'moment'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from './sheet'
import reactLogo from '../../Images/200px-React-icon.svg.png'
import Config from 'react-native-config'

const formatCreatedAt = createdAt => moment(createdAt).calendar(null, {
  sameDay: '[Today]',
  nextDay: '[Tomorrow]',
  nextWeek: 'dddd',
  lastDay: '[Yesterday]',
  lastWeek: 'dddd',
  sameElse: 'DD/MM/YYYY'
})

class Group extends Component {
  constructor (props) {
    super(props)

    this.goToMessages = this.props.goToMessages.bind(this, this.props.group)
  }

  render () {
    const { icon, id, name, Messages, unreadCount } = this.props.group

    return (
      <TouchableHighlight
        key={id}
        onPress={this.goToMessages}
      >
        <View style={styles.groupContainer}>
          <Image
            style={styles.groupImage}
            source={icon ? { uri: `${Config.API_URL}${icon}` } : reactLogo}
          />
          <View style={styles.groupTextContainer}>
            <View style={styles.groupTitleContainer}>
              <Text style={styles.groupName}>{`${name}`}</Text>
              <Text style={styles.groupLastUpdated}>
                {Messages.length
                  ? formatCreatedAt(Messages[0].createdAt) : ''}
              </Text>
            </View>
            <View style={styles.groupTextInnerContainer}>
              <View style={styles.column}>
                <Text style={styles.groupUsername}>
                  {Messages.length
                    ? `${Messages[0].User.username}:` : ''}
                </Text>
                <Text style={styles.groupText} numberOfLines={1}>
                  {Messages.length ? Messages[0].text : ''}
                </Text>
              </View>
              {unreadCount
                ? <TouchableHighlight>
                  <View style={styles.groupBadge}>
                    <Text style={styles.groupBadgeText}>
                      {unreadCount}
                    </Text>
                  </View>
                </TouchableHighlight> : undefined}
            </View>
          </View>
          <Icon
            name='angle-right'
            size={24}
            color={'#8c8c8c'}
          />
        </View>
      </TouchableHighlight>
    )
  }
}

Group.propTypes = {
  goToMessages: PropTypes.func.isRequired,
  group: PropTypes.shape({
    id: PropTypes.number,
    icon: PropTypes.string,
    name: PropTypes.string,
    messages: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.shape({
        cursor: PropTypes.string,
        node: PropTypes.object
      }))
    })
  })
}

export default Group
