import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { WebView } from 'react-native-webview';

// import { Container } from './styles';

export default function Browser({ navigation }) {
  // console.log(navigation.state);
  const repository = useMemo(() => navigation.getParam('repository'));

  return <WebView source={{ uri: repository.html_url }} style={{ flex: 1 }} />;
}

Browser.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('repository').name,
});

Browser.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};
