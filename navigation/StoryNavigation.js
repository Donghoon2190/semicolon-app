import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import VideoStory from "../screens/story/VideoStory";
import TakeStory from "../screens/story/TakeStory";
import UploadStory from "../screens/story/UploadStory";
import styles from "../styles";
import React from "react";
import MakeStory from '../screens/story/MakeStory';

// const StoryTabs = createMaterialTopTabNavigator(
//     {
//         Take: {
//             screen: TakeStory,
//             navigationOptions: {
//                 tabBarLabel: "사진 촬영"
//             }
//         },
//         Select: {
//             screen: VideoStory,
//             navigationOptions: {
//                 tabBarLabel: "동영상 촬영"
//             }
//         },
//     },
//     {
//         tabBarPosition: "bottom",
//         tabBarOptions: {

//             indicatorStyle: {
//                 backgroundColor: styles.navyColor,
//                 marginBottom: 48
//             },
//             labelStyle: {
//                 color: styles.navyColor,
//                 fontWeight: "600"
//             },
//             style: {
//                 //paddingBottom: 20,
//                 backgroundColor: styles.searchColor
//             }
//         }
//     }
// );



export default createStackNavigator(
    {
        TakeStory: {
            screen: MakeStory,
            navigationOptions: {
                headerTintColor: styles.blackColor,
                headerBackTitle: " ",
                title: "스토리"
            }
        },
        StoryUpload: {
            screen: UploadStory,
            navigationOptions: {
                headerBackTitle: " ",
                headerTintColor: styles.blackColor,
                title: "업로드"
            }
        }

    },
    {
        mode: "modal"
    }
);
