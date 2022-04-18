import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import TokenCard from '../../components/TokenCard/TokenCard';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import TextRegular from '../../components/TextWrappers/TextRegular';
import { getHomeTokens, getTokenById } from '../../store/actions/tokens';

const TokensListScreen = ({ navigation }) => {
  const homeTokens = useSelector(store => store.tokens.homeTokens);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleNavigateToToken = async (id, iconUrl) => {
    dispatch(getTokenById(id));
    navigation.navigate('Token', { id, iconUrl });
  };

  const getData = useCallback(async () => {
    setLoading(true);
    await dispatch(getHomeTokens());
    setLoading(false);
  }, []);

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.containerInner}>
        {homeTokens &&
          homeTokens.map(token => (
            <TouchableOpacity
              key={token.id}
              onPress={() => handleNavigateToToken(token.id, token.icon)}>
              <TokenCard token={token} />
            </TouchableOpacity>
          ))}
        {!homeTokens && <TextRegular>You got no tokens</TextRegular>}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerInner: {
    flex: 1,
    paddingHorizontal: 16,
  },
});

export default TokensListScreen;
