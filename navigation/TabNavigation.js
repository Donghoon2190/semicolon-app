import React from "react";
import Home from "../screens/Home";
import Search from "../screens/tabs/Search";
import Profile from "../screens/tabs/Profile";
import { View } from "react-native";
import MessagesLink from "../components/MessagesLink";
import Notifications from "../screens/tabs/Notifications";
import { createStackNavigator } from 'react-navigation-stack';
import { TouchableOpacity } from "react-native-gesture-handler";
import { createBottomTabNavigator } from 'react-navigation-tabs';

const stackFactory = (initialRoute, customConfig) =>
    createStackNavigator({
        InitialRoute: {
            screen: initialRoute,
            navigationOptions: { ...customConfig }
        }
    });

export default createBottomTabNavigator({
    Home: {
        screen: stackFactory(Home, {
            title: "Home  ٩(๑•̀o•́๑)و",
            headerRight: <MessagesLink />,
        })
    },
    Search: {
        screen: stackFactory(Search, {
            title: "Search  ٩(๑•̀o•́๑)و"
        })
    },
    Add: {
        screen: View,
        navigationOptions: {
            tabBarOnPress: ({ navigation }) => navigation.navigate("PhotoNavigation")
        }
    },
    Notifications: {
        screen: stackFactory(Notifications, {
            title: "Notifications  ٩(๑•̀o•́๑)و"
        })
    },
    Profile: {
        screen: stackFactory(Profile, {
            title: "Profile  ٩(๑•̀o•́๑)و"
        })
    }
});