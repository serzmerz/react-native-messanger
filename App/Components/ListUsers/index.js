import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import reactLogo from '../../Images/200px-React-icon.svg.png'
import {List, ListItem, Thumbnail, Text, Left, Body, Right} from 'native-base'
import {FlatList, TouchableOpacity} from 'react-native'
import Config from 'react-native-config'

const renderItem = (func = () => null) => ({ item }) => (
  <ListItem avatar key={item.id}>
    <Left>
      <Thumbnail source={item.image ? { uri: `${Config.API_URL}${item.image}` } : reactLogo} />
    </Left>
    <Body>
      <TouchableOpacity onPress={func(item)} disabled={!func(item)}>
        <Text>{item.username}</Text>
        <Text note>{item.summary}</Text>
      </TouchableOpacity>
    </Body>
    <Right>
      <Text note>{moment(item.updatedAt).format('hh:mm a')}</Text>
    </Right>
  </ListItem>
)
const ListUsers = ({ users, onPress }) => (
  <List>
    <FlatList
      data={users}
      keyExtractor={item => item.id}
      renderItem={renderItem(onPress)}
    />
  </List>
)

ListUsers.propTypes = {
  users: PropTypes.array.isRequired,
  onPress: PropTypes.func
}

export default ListUsers
