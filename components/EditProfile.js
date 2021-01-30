import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import { Image, Keyboard, Text, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components";
import AuthButton from "../components/AuthButton";
import useInput from "../hooks/useInput";
import AuthInput from "./AuthInput";
import { gql } from 'apollo-boost';
import { ME } from "../screens/tabs/Profile";
import { FEED_QUERY } from "../screens/tabs/Home";
const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const Enter = styled.View`
margin-top: 15px
`;


const EDIT_USER = gql`
    mutation editUser(
        $username:String
        $email:String
         $firstName:String
        $lastName:String
        $bio:String
        $avatar:String
    )
    {editUser(
    username : $username
    email : $email
    firstName : $firstName
    lastName : $lastName
    bio : $bio
    avatar : $avatar
    )
  }`

const Profile = styled.TouchableOpacity`
`
export default ({ userInfo, setUserInfo, setEditProfile, userAvatar, navigation }) => {
    const username = useInput(userInfo.username);
    const firstName = useInput(userInfo.firstName);
    const lastName = useInput(userInfo.lastName);
    const bio = useInput(userInfo.bio);
    const [loading, setLoading] = useState(false);


    const goUpload = () => (
        navigation.navigate("UploadNavigation", { profile: "upload" })
    );

    const [editUserMutation] = useMutation(EDIT_USER, {
        variables: {
            username: username.value,
            firstName: firstName.value,
            lastName: lastName.value,
            bio: bio.value,
        }, refetchQueries: [{ query: ME, query: FEED_QUERY }]
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        setUserInfo({
            username: username.value,
            firstName: firstName.value,
            lastName: lastName.value,
            bio: bio.value,
        })
        const { data } = await editUserMutation();
        setLoading(false)
        setEditProfile(false);
        console.log(data)
    }
    return (<>
        <View>
            <Profile onPress={goUpload}>
                <Image
                    style={{ height: 90, width: 90, borderRadius: 50, marginTop: 30 }}
                    source={{ uri: userAvatar }}
                />
            </Profile>
            <Text style={{ marginBottom: 40 }}>{userInfo.username}</Text>
        </View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <View>
                <AuthInput
                    {...username}
                    placeholder="username"
                />
                <AuthInput
                    {...firstName}
                    placeholder="firstName"
                />
                <AuthInput
                    {...lastName}
                    placeholder="lastName"
                    autoCorrect={false}
                />
                <AuthInput
                    {...bio}
                    placeholder="bio"
                    autoCorrect={false}
                />
                <Enter />
                <AuthButton loading={loading} onPress={onSubmit} text="Submit" />
                <Enter />
                <AuthButton loading={loading} onPress={() => setEditProfile(false)} text="Back" />
            </View>
        </TouchableWithoutFeedback >

    </>
    )
}