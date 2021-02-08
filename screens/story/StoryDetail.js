import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Text } from 'react-native';
import Modal from 'react-native-modal';
import { useMutation, useQuery } from 'react-apollo-hooks';
import { gql } from "apollo-boost";
import { FEED_QUERY } from '../home/Home';
import constants from "../../Constants";
import { STORY_FRAGMENT } from '../../Fragments';
import styled from 'styled-components';


const HIDE_STORY = gql`
  mutation hideStory(
    $id : String!,
  ) { hideStory(
    id: $id,
    ) 
  }
`;

const GETSTORY_QUERY = gql`
query getStories($id: String!)  {
    getStories(id: $id) {
     ...StoryParts
    }
  }
  ${STORY_FRAGMENT}
`;

const InputButton = styled.TouchableOpacity`
    background-color:white;
    justifyContent: center
    align-items: center
    height: 40px
    width:100px
    margin-right:5px
    margin-left:5px
    border-radius:5px
    `

export default ({ id, visibles, setModalUp }) => {
    console.log(id)
    const [menu, setMenu] = useState(false);
    const [loading, setLoading] = useState(false);

    const [hideStoryMutation] = useMutation(HIDE_STORY,
        { variables: { id }, refetchQueries: [{ query: FEED_QUERY }] });

    const { data, loading: Sloading } = useQuery(GETSTORY_QUERY,
        { variables: { id: id } });
    console.log(data)
    const hideStory = async () => {
        setLoading(true);
        await hideStoryMutation();
        setLoading(false);
        setModalVisible(!isModalVisible);
    }
    return (

        !Sloading ?
            (
                <>
                    <TouchableWithoutFeedback onPress={() => setModalUp(!visibles)}>
                        <Modal visible={visibles}
                            animationType="slide"
                        // 비디오
                        // 메세지 보내는 인풋창
                        >
                            <View style={styles.modalView} >
                                <View style={{ marginBottom: 10, width: 100 }}>


                                </View>
                            </View >
                        </Modal >
                    </TouchableWithoutFeedback>

                    <Modal visible={menu}
                        animationType="slide"
                    // 옵션창
                    >
                        <View style={styles.modalView}>

                            <View style={{ marginBottom: 10, flexDirection: "row" }}>
                                <InputButton onPress={hideStory}>
                                    {loading ? <ActivityIndicator color={"black"} />
                                        : <Text style={{ color: "black", fontWeight: "bold" }}>숨기기</Text>}
                                </InputButton>

                                <InputButton onPress={() => {
                                    setMenu(!menu);
                                    setModalVisible(!isModalVisible);
                                }}>
                                    {loading ? <ActivityIndicator color={"black"} />
                                        : <Text style={{ color: "black", fontWeight: "bold" }}>취소</Text>}
                                </InputButton>
                            </View>
                        </View >
                    </Modal >
                </>) : null
    );

}

const styles = StyleSheet.create({
    modalView: {
        marginLeft: -constants.width / 7,
        width: constants.width * 1.2,
        height: constants.height,
        backgroundColor: "rgba(0,0,0,0.7)",
        alignItems: "center",
        justifyContent: 'center'
    }
});