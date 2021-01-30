import React from "react";
import styled from "styled-components/native";
import { withNavigation } from "react-navigation";

const Container = styled.TouchableOpacity`
  padding-right: 20px;
`;
const Text = styled.Text``;

export default withNavigation(({ navigation }) => {
  let navigationName;
  if (navigation.getParam("profile")) {
    navigationName = "PUpload";
  } else {
    navigationName = "Upload";
  }
  return <Container onPress={() => navigation.navigate(navigationName, { photo: navigation.getParam("photo") })}>
    <Text>Next</Text>
  </Container>
});