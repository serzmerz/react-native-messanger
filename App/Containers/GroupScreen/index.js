import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  FlatList,
  ActivityIndicator,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import {compose} from "redux";
import { GroupSelectors } from "../../Redux/GroupRedux";
import styles from './sheet';
import Group from './GroupItem';
import {Body, Header, Icon, Left, Right, Title, Button as Btn} from "native-base";
import BtnHeader from "../../Components/AddHeaderButton/index";


class Groups extends Component {
  static navigationOptions = {
    drawerLabel: 'Chats',
    title: 'Chats',
  };

  onRefresh = () => {
    this.props.refetch();
    // faking unauthorized status
  }

  keyExtractor = item => item.id;

  goToMessages = (group) => {
    const { navigate } = this.props.navigation;
    navigate('MessagesScreen', { groupId: group.id, title: group.name, icon: group.icon });
  }

  goToNewGroup = () => {
    const { navigate } = this.props.navigation;
    navigate('AddGroupScreen');
  }

  renderItem = ({ item }) => <Group group={item} goToMessages={this.goToMessages} />;

  render() {
    const { isLoading, groups } = this.props;
    // render loading placeholder while we fetch messages
    if (isLoading) {
      return (
        <View style={[styles.loading, styles.container]}>
          <Header>
            <Left>
              <Btn title='menu' onPress={() => this.props.navigation.navigate('DrawerToggle')} transparent>
                <Icon name='menu' />
              </Btn>
            </Left>
            <Body>
            <Title>Chats</Title>
            </Body>
            <Right />
          </Header>
          <ActivityIndicator />
        </View>
      );
    }

    if (!groups.length) {
      return (
        <View style={styles.container}>
          <Header>
            <Left>
              <Btn title='menu' onPress={() => this.props.navigation.navigate('DrawerToggle')} transparent>
                <Icon name='menu' />
              </Btn>
            </Left>
            <Body>
            <Title>Chats</Title>
            </Body>
            <Right />
          </Header>
          <BtnHeader title='Create Chat' onPress={this.goToNewGroup} />
          <Text style={styles.warning}>{'You do not have any groups.'}</Text>
        </View>
      );
    }

    // render list of groups for user
    return (
      <View style={styles.container}>
        <Header>
          <Left>
            <Btn title='menu' onPress={() => this.props.navigation.navigate('DrawerToggle')} transparent>
              <Icon name='menu' />
            </Btn>
          </Left>
          <Body>
          <Title>Chats</Title>
          </Body>
          <Right />
        </Header>
        <FlatList
          data={groups}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          ListHeaderComponent={() => <BtnHeader title='Create Chat' onPress={this.goToNewGroup} />}
          onRefresh={this.onRefresh}
          refreshing={isLoading}
        />
      </View>
    );
  }
}
Groups.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
  loading: PropTypes.bool,
  refetch: PropTypes.func,
  groups: PropTypes.arrayOf(
    PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }),
    ),
};

const mapStateToProps = (state) => ({
  groups: GroupSelectors.selectGroups(state),
  isLoading: GroupSelectors.selectIsLoading(state),
});

export default compose(
  connect(mapStateToProps),
)(Groups);
