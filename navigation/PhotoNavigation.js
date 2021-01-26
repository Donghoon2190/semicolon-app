import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import React from "react";
import { createStackNavigator } from 'react-navigation-stack';
import SelectPhoto from "../screens/photo/SelectPhoto";
import TakePhoto from "../screens/photo/TakePhoto";
import UploadPhoto from "../screens/photo/UploadPhoto";
import styles from '../styles';
import styled from 'styled-components/native';
import UploadLink from '../components/UploadLink';


const handleSelected = ({ navigation }) => {
    navigation.navigate("Upload")
}

const PhotoTabs = createMaterialTopTabNavigator(
    {
        Select: {
            screen: SelectPhoto,
            navigationOptions: {

                tabBarLabel: "Select"
            }
        },
        Take: {
            screen: TakePhoto,
            navigationOptions: {
                tabBarLabel: "Take"
            }
        }

    },
    {
        tabBarPosition: "bottom",
        tabBarOptions: {

            indicatorStyle: {
                backgroundColor: styles.navyColor,
                marginBottom: 48
            },
            labelStyle: {
                fontWeight: "bold"
            },
            style: {
                backgroundColor: styles.searchColor
            }
        }
    }
);

export default createStackNavigator({
    Tabs: {
        screen: PhotoTabs,
        navigationOptions: {
            title: " ",
            headerRight: () => <UploadLink />
        }
    },
    Upload: {
        screen: UploadPhoto,
        navigationOptions: {
            title: " ",
        }
    }
},
    {
        mode: "modal"
    }
);