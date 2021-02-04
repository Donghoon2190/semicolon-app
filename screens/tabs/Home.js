import React, { useState } from "react";
import styled from "styled-components/native";
import { gql } from "apollo-boost";
import Loader from "../../components/Loader";
import { useQuery } from "react-apollo-hooks";
import { ScrollView, RefreshControl, View, Text, StyleSheet } from "react-native";
import { Thumbnail } from 'native-base';
import Post from "../../components/Post";
import { POST_FRAGMENT, STORY_FRAGMENT } from "../../Fragments";
import { LinearGradient } from 'expo-linear-gradient';

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
    getStories {
      ...StoryParts
    }
  }
  ${STORY_FRAGMENT}
`;

const Story = styled.TouchableOpacity`
`;

export default () => {
  let localStyles = styles()

  const [refreshing, setRefreshing] = useState(false);
  const { loading, data, refetch } = useQuery(FEED_QUERY);
  const { loading: sloading, data: sdata, refetch: srefetch } = useQuery(STORY_QUERY);

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

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }
    >
      <>
        {
          loading ?
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
                    {sdata &&
                      sdata.getStories &&
                      sdata.getStories.map(story =>
                        <Story>
                          <LinearGradient start={[1, 0.5]}
                            end={[0, 0]}
                            colors={['#e3179e', 'tomato', 'orange', 'yellow']}
                            style={localStyles.linearGradient}>
                            <View style={localStyles.button}>
                              <Thumbnail style={{ marginHorizontal: 'auto', borderColor: 'white', borderWidth: 2 }} source={{ uri: story.user.avatar }} />
                            </View>
                          </LinearGradient>
                          <Text style={{ textAlign: 'center', marginTop: 5 }}>{story.user.username}</Text>
                        </Story>
                      )}

                  </ScrollView>
                </View>
              </View>


              { data &&
                data.seeFeed &&
                data.seeFeed.map(post => <Post key={post.id} {...post} />)}
            </>
            )
        }
      </>
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

//  <Story>
//                       <LinearGradient start={[1, 0.5]}
//                         end={[0, 0]}
//                         colors={['#e3179e', 'tomato', 'orange', 'yellow']}
//                         style={localStyles.linearGradient} >
//                         <View style={localStyles.button}>
//                           <Thumbnail style={{ marginHorizontal: 'auto', borderColor: 'white', borderWidth: 2 }} source={{ uri: 'https://steemitimages.com/u/blockchainstudio/avatar' }} />
//                         </View>
//                       </LinearGradient>
//                       <Text style={{ textAlign: 'center', color: 'gray', marginTop: 5 }}>강동훈</Text>
//                     </Story>

//                     <Story>
//                       <LinearGradient start={[1, 0.5]}
//                         end={[0, 0]}
//                         colors={['#e3179e', 'tomato', 'orange', 'yellow']}
//                         style={localStyles.linearGradient} >
//                         <View style={localStyles.button}>
//                           <Thumbnail style={{ marginHorizontal: 'auto', borderColor: 'white', borderWidth: 2 }} source={{ uri: 'https://steemitimages.com/u/blockchainstudio/avatar' }} />
//                         </View>
//                       </LinearGradient>
//                       <Text style={{ textAlign: 'center', color: 'gray', marginTop: 5 }}>조단</Text>
//                     </Story>

//                     <Story>
//                       <LinearGradient start={[1, 0.5]}
//                         end={[0, 0]}
//                         colors={['#e3179e', 'tomato', 'orange', 'yellow']}
//                         style={localStyles.linearGradient} >
//                         <View style={localStyles.button}>
//                           <Thumbnail style={{ marginHorizontal: 'auto', borderColor: 'white', borderWidth: 2 }} source={{ uri: 'https://steemitimages.com/u/blockchainstudio/avatar' }} />
//                         </View>
//                       </LinearGradient>
//                       <Text style={{ textAlign: 'center', color: 'gray', marginTop: 5 }}>정소윤</Text>
//                     </Story>

//                     <Story>
//                       <LinearGradient start={[1, 0.5]}
//                         end={[0, 0]}
//                         colors={['#e3179e', 'tomato', 'orange', 'yellow']}
//                         style={localStyles.linearGradient} >
//                         <View style={localStyles.button}>
//                           <Thumbnail style={{ marginHorizontal: 'auto', borderColor: 'white', borderWidth: 2 }} source={{ uri: 'https://steemitimages.com/u/blockchainstudio/avatar' }} />
//                         </View>
//                       </LinearGradient>
//                       <Text style={{ textAlign: 'center', color: 'gray', marginTop: 5 }}>김종훈</Text>
//                     </Story>