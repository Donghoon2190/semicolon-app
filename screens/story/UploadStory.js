import React, { useState } from "react";
import axios from "axios";
import { Image, ActivityIndicator, Alert, Platform } from "react-native";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import styles from "../../styles";
import constants from "../../Constants";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo-hooks";
import { FEED_QUERY } from "../home/Home";
import { ME } from "../tabs/Profile";

const UPLOADSTORY = gql`
  mutation uploadStory($caption: String, $files: [String!]!, $tagUser: [String!]) {
    uploadStory(caption: $caption, files: $files, tagUser: $tagUser) {
      id
      caption
    }
  }
`;

const View = styled.View`
  flex: 1;
`;

const Container = styled.View`
  padding: 20px;
  flex-direction: row;
`;

const Form = styled.View`
  justify-content: flex-start;
`;

const STextInput = styled.TextInput`
  margin-bottom: 10px;
  border: 0px solid ${styles.lightGreyColor};
  border-bottom-width: 1px;
  padding-bottom: 10px;
  width: ${constants.width - 180};
`;

const Button = styled.TouchableOpacity`
  background-color: ${props => props.theme.blueColor};
  padding: 10px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  color: white;
  font-weight: 600;
`;

export default ({ navigation }) => {
  const [loading, setIsLoading] = useState(false);
  const story = navigation.getParam("story");
  const captionInput = useInput();
  const tagUserInput = useInput();
  const [uploadMutation] = useMutation(UPLOADSTORY, {
    refetchQueries: () => [{ query: FEED_QUERY }, { query: ME }]
  });
  const handleSubmit = async () => {
    const formData = new FormData();
    const name = story.filename;
    console.log(story.filename)
    const [, type] = name.split(".");
    const names = story.filename.replaceAll("MOV", "mp4")
    const uris = story.uri.replaceAll("MOV", "mp4")
    console.log(uris)
    const imageType = Platform.os === "ios" ? type.toLowerCase() : "image/jpeg";
    formData.append("file", {
      name: names,
      type: "video/mp4",
      uri: uris
    });
    try {
      setIsLoading(true);
      const {
        data: { location }
      } = await axios.post("https://semicolon-backend.herokuapp.com/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data"
        }
      });
      console.log(location);
      console.log(tagUserInput);
      let tagUsers
      if (tagUserInput.value === "" || tagUserInput.value === "undefined") {
        tagUsers = tagUserInput.value.split(" ");
      }
      console.log(tagUsers);
      await uploadMutation({
        variables: {
          files: [location],
          caption: captionInput.value,
          tagUser: tagUsers
        }
      });

      //if (result) {
      navigation.navigate("TabNavigation");
      //}

    } catch (e) {
      console.log("에러 " + e);
      Alert.alert("업로드 실패", "다시 시도해 주세요 🤔");
    } finally {
      setIsLoading(false);
    }

  };
  return (
    <View>
      <Container>
        <Image
          source={{ uri: story.uri }}
          style={{ height: 80, width: 80, marginRight: 30 }}
        />
        <Form>
          <STextInput
            onChangeText={captionInput.onChange}
            value={captionInput.value}
            placeholder="글 내용"
            multiline={true}
            placeholderTextColor={styles.darkGreyColor}
          />
          <STextInput
            onChangeText={tagUserInput.onChange}
            value={tagUserInput.value}
            placeholder="태그할 사람"
            multiline={true}
            placeholderTextColor={styles.darkGreyColor}
          />
          <Button onPress={handleSubmit}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
                <Text>업로드 </Text>
              )}
          </Button>
        </Form>
      </Container>
    </View>
  );
};