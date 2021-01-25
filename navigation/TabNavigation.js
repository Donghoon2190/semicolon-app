import { View, Text, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import React from "react";
import Home from "../screens/tabs/Home";
import Search from "../screens/tabs/Search/index";
import Notifications from "../screens/tabs/Notifications";
import MessagesLink from "../components/MessagesLink";
import Profile from "../screens/tabs/Profile";
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from "react-native";
import NavIcon from "../components/NavIcon";
import { AntDesign } from '@expo/vector-icons';
import styled from "styled-components/native";
import constants from "../constants";
import styles from "../styles";
import Detail from "../screens/Detail";
import UserDetail from "../screens/UserDetail";

const stackFactory = (initialRoute, customConfig) =>
    createStackNavigator({
        InitialRoute: {
            screen: initialRoute,
            navigationOptions: {
                ...customConfig
            }
        },
        Detail: {
            screen: Detail,
            navigationOptions: {
                title: "Photo"
            }
        },
        UserDetail: {
            screen: UserDetail,
            navigationOptions: ({ navigation }) => ({
                headerTintColor: styles.blackColor,
                title: navigation.getParam("username")
            })
        }
    },
        {
            defaultNavigationOptions: {
                headerTintColor: styles.blackColor
            }
        });

const Image = styled.Image`
  margin : -30px;
  margin-left : -15px;
  width: ${constants.width / 3};
`;

export default createBottomTabNavigator(
    {
        Home: {
            screen: stackFactory(Home, {
                headerRight: () => <MessagesLink />,
                headerTitle: () => <Image resizeMode={"contain"} source={require("../assets/logo.png")} />
            }),
            navigationOptions: {
                tabBarIcon: ({ focused }) => (
                    <NavIcon
                        focused={focused}
                        name={Platform.OS === "ios" ? focused ? "home-sharp" : "home-outline" : focused ? "home-sharp" : "home-outline"} size={24} />
                )
            }
        },
        Search: {
            screen: stackFactory(Search),
            navigationOptions: {
                tabBarIcon: ({ focused }) => (
                    <NavIcon
                        focused={focused}
                        name={Platform.OS === "ios" ? focused ? "ios-search-sharp" : "ios-search-outline" : focused ? "md-search-sharp" : "md-search-outline"} />
                )
            }
        },
        Add: {
            screen: View,
            navigationOptions: {
                tabBarOnPress: ({ navigation }) =>
                    navigation.navigate("PhotoNavigation"),
                tabBarIcon: ({ focused }) => (
                    <NavIcon
                        focused={focused}
                        name={Platform.OS === "ios" ? "ios-add" : "md-add"} size={32} />
                )
            }
        },
        Notifications: {
            screen: stackFactory(Notifications, {
                title: "Notifications"
            }),
            navigationOptions: {
                tabBarIcon: ({ focused }) => (
                    <AntDesign
                        focused={focused}
                        name={focused ? "star" : "staro"} color={focused ? styles.navyColor : styles.darkGreyColor} size={26} />
                )
            }
        },
        Profile: {
            screen: stackFactory(Profile, {
                title: "Profile"
            }),
            navigationOptions: {
                tabBarIcon: ({ focused }) => (
                    <NavIcon
                        focused={focused} name={Platform.OS === "ios" ? focused ? "person" : "person-outline" : focused ? "person" : "person-outline"} />
                )
            }
        }
    },
    {
        tabBarOptions: {
            // 밑에 메뉴 글씨 제거
            showLabel: false
        }
    }
);