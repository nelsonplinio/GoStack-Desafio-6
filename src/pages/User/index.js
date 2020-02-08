import React, { useState, useEffect, useMemo } from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import api from '../../services/api';
import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

export default function User({ navigation }) {
  const [page, setPage] = useState(1);
  const [stars, setStars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(true);

  const user = useMemo(() => {
    return navigation.getParam('user');
  });

  async function loadStarred() {
    if (page !== 1) {
      setLoading(true);
    }

    const response = await api.get(`/users/${user.login}/starred?page=${page}`);
    if (page === 1) {
      setRefreshing(false);
      setStars(response.data);
    } else {
      setLoading(false);
      setStars([...stars, ...response.data]);
    }
  }

  useEffect(() => {
    loadStarred();
  }, [page]);

  return (
    <Container>
      <Header>
        <Avatar source={{ uri: user.avatar }} />
        <Name>{user.name}</Name>
        <Bio>{user.bio}</Bio>
      </Header>

      <Stars
        data={stars}
        onRefresh={() => setPage(1)}
        refreshing={refreshing}
        keyExtractor={star => `${star.id}`}
        renderItem={({ item }) => (
          <Starred
            onPress={() => navigation.navigate('Browser', { repository: item })}
          >
            <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
            <Info>
              <Title>{item.name}</Title>
              <Author>{item.owner.login}</Author>
            </Info>
          </Starred>
        )}
        ibEbdReacgedThreshold={0.2}
        onEndReached={() => setPage(page + 1)}
      />

      {loading && <ActivityIndicator color="#333" size="small" />}
    </Container>
  );
}

User.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
    navigate: PropTypes.func,
  }).isRequired,
};

User.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('user').name,
});
