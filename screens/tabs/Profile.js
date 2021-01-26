import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { gql } from "apollo-boost";
import { USER_FRAGMENT } from "../../Fragments";
import Loader from "../../components/Loader";
import { useQuery } from "react-apollo-hooks";
//import UserProfile from "../../components/UserProfile";
import styled from "styled-components/native";
import UserProfile from "../../components/UserProfile";

export const ME = gql`
  {
    me {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

const View = styled.View``;
const Text = styled.Text``;

export default ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
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
  // refreshControl = {< RefreshControl refreshing = { refreshing } onRefresh = { refresh } />}
  const { loading, data } = useQuery(ME);
  console.log(loading, data);
  return (
    <ScrollView>
      {loading ? <Loader /> : data && data.me && <UserProfile {...data.me} />}
    </ScrollView>
  );
};