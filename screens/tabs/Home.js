import React, { useState } from "react";
import styled from 'styled-components/native';
import Loader from "../../components/Loader";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import { RefreshControl, ScrollView } from "react-native";
import Post from "../../components/Post";
import { POST_FRAGMENT } from "../../Fragments";



const FEED_QUERY = gql`
  {
    seeFeed {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;
const Text = styled.Text`
`;

export default () => {
  const [refreshing, setRefreshing] = useState(false);
  const { loading, data, refetch } = useQuery(FEED_QUERY);
  const refresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };
  return (<ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}>
    {loading ? (<Loader />) : (data && data.seeFeed && data.seeFeed.map(post => <Post key={post.id} {...post} />)
    )}
  </ScrollView>
  );
};