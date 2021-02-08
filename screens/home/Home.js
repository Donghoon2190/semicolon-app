import React, { useState } from "react";
import styled from "styled-components/native";
import { gql } from "apollo-boost";
import Loader from "../../components/Loader";
import { useQuery } from "react-apollo-hooks";
import { ScrollView, RefreshControl, View, Text, StyleSheet } from "react-native";
import { Thumbnail } from 'native-base';
import Post from "../../components/Post";
import { POST_FRAGMENT, USER_FRAGMENT } from "../../Fragments";
import { LinearGradient } from 'expo-linear-gradient';
import StoryDetail from "../story/StoryDetail";

export const FEED_QUERY = gql`
  {
    seeFeed {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;

export const STORY_QUERY = gql`
  {
    feedStories {
      id
      avatar
      username
    }
  }
`;

export const SEEN_QUERY = gql`
   mutation clickedStory($storyId : String!) {
      clickedStory(storyId:$storyId)
    }
`;

export const ME = gql`
  {
    me {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;



const Story = styled.TouchableOpacity`
`;

export default () => {
  let localStyles = styles()

  const [refreshing, setRefreshing] = useState(false);
  const [modalUp, setModalUp] = useState(false);
  const [nowId, setNowId] = useState(null);
  const { loading, data, refetch } = useQuery(FEED_QUERY);
  const { loading: sloading, data: sdata, refetch: srefetch } = useQuery(STORY_QUERY);
  const { loading: mloading, data: mdata, refetch: mrefetch } = useQuery(ME);
  // const [seenUserMutation] = useMutation(SEEN_QUERY, {
  //   variables: {
  //     storyId: id
  //   }
  // });

  const refresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
      await srefetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }
    >
      {
        mloading && sloading && loading ?
          (<Loader />)
          :
          (<>
            <View style={{ height: 100 }}>

              <View style={{ flex: 3, borderBottomWidth: 0.8, backgroundColor: "white", borderBottomColor: 'lightgray' }}>
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    alignItems: 'center',
                    paddingStart: 5,
                    paddingEnd: 5
                  }}
                  horizontal={true} >

                  {mdata &&
                    mdata.me &&
                    mdata.me.stories ?

                    <Story>
                      <LinearGradient start={[1, 0.5]}
                        end={[0, 0]}
                        colors={['#e3179e', 'tomato', 'orange', 'yellow']}
                        style={localStyles.linearGradient}>
                        <View style={localStyles.button}>
                          <Thumbnail style={{ marginHorizontal: 'auto', borderColor: 'white', borderWidth: 2 }} source={{ uri: mdata.me.avatar }} />
                        </View>
                      </LinearGradient>
                      <Text style={{ textAlign: 'center', marginTop: 5 }}>내 스토리</Text>
                    </Story>
                    :
                    <Story>
                      <LinearGradient start={[1, 0.5]}
                        end={[0, 0]}
                        colors={['lightgray', 'lightgray']}
                        style={localStyles.linearGradient}>
                        <View style={localStyles.button}>
                          <Thumbnail style={{ opacity: 0.7, marginHorizontal: 'auto', borderColor: 'white', borderWidth: 2 }} source={{ uri: "https://previews.123rf.com/images/siamimages/siamimages1611/siamimages161100055/65441642-add-plus-sign-icon-illustration-design.jpg" }} />
                        </View>
                      </LinearGradient>
                      <Text style={{ color: 'gray', textAlign: 'center', marginTop: 5 }}>내 스토리</Text>
                    </Story>
                  }

                  {sdata &&
                    sdata.feedStories &&
                    sdata.feedStories.map(followings =>
                      // followings.stories.map(
                      //   story => story.id === mdata.me.clickedStories.id ?
                      <Story onPress={() => {
                        setNowId(followings.id)
                        setModalUp(!modalUp)
                      }}>
                        {modalUp ? < StoryDetail id={nowId} visibles={modalUp} setModalUp={setModalUp} /> : null}
                        <LinearGradient start={[1, 0.5]}
                          end={[0, 0]}
                          colors={['#e3179e', 'tomato', 'orange', 'yellow']}
                          style={localStyles.linearGradient}>
                          <View style={localStyles.button}>
                            <Thumbnail style={{ marginHorizontal: 'auto', borderColor: 'white', borderWidth: 2 }} source={{ uri: followings.avatar }} />
                          </View>
                        </LinearGradient>
                        <Text style={{ textAlign: 'center', marginTop: 5 }}>{followings.username}</Text>
                      </Story>
                      // :
                      // <Story>
                      //    <LinearGradient start={[1, 0.5]}
                      //    end={[0, 0]}
                      //     colors={['lightgray', 'lightgray']}
                      //      style={localStyles.linearGradient}>
                      //      <View style={localStyles.button}>
                      //        <Thumbnail style={{ marginHorizontal: 'auto', borderColor: 'white', borderWidth: 2 }} source={{ uri: followings.avatar }} />
                      //      </View>
                      //    </LinearGradient>
                      //    <Text style={{ color : 'gray', textAlign: 'center', marginTop: 5 }}>{followings.username}</Text>
                      //  </Story> 
                      // )
                    )

                  }

                </ScrollView>
              </View>
            </View>


            { data &&
              data.seeFeed &&

              data.seeFeed.map(post => <Post key={post.id} {...post} />)}
          </>
          )
      }

    </ScrollView>
  );
};

const gradientMargin = () => {
  const ratio = (1 - gradientRatio(62)) / 2
  return 62 * ratio
}

const gradientRatio = () => {
  return 0.94
}

const styles = () => StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 0,
  },
  linearGradient: {
    borderRadius: 62 / 2,
    width: 62,
    height: 62,
    marginHorizontal: 5
  },
  button: {
    margin: gradientMargin(62),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: (62 / 2) * gradientRatio(62),
    width: 62 * gradientRatio(62),
    height: 62 * gradientRatio(62),
    paddingHorizontal: 1
  },
});