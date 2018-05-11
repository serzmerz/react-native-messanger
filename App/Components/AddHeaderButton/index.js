import React from 'react'
import PropTypes from 'prop-types'
import { View, Button, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  header: {
    alignItems: 'flex-end',
    padding: 6,
    borderColor: '#eee',
    borderBottomWidth: 1
  }
})

const BtnHeader = ({ onPress, title }) => (
  <View style={styles.header}>
    <Button title={title} onPress={onPress} />
  </View>
)

BtnHeader.propTypes = {
  onPress: PropTypes.func.isRequired
}

export default BtnHeader
