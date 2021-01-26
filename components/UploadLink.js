import React from "react";
import styled from "styled-components/native";
import { withNavigation } from "react-navigation";

const Container = styled.TouchableOpacity`
  padding-right: 20px;
`;
const Text = styled.Text``;

export default withNavigation(({ navigation }) => {
  return <Container onPress={() => navigation.navigate("Upload", { photo: navigation.getParam("photo") })}>
    <Text>Next</Text>
  </Container>
});