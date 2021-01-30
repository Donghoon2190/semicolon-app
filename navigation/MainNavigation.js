import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import TabNavigation from "./TabNavigation";
import PhotoNavigation from "./PhotoNavigation";
import MessageNavigation from "./MessageNavigation";
import UploadNavigation from "./UploadNavigation";
const MainNavigation = createStackNavigator(
    {
        TabNavigation,
        PhotoNavigation,
        MessageNavigation,
        UploadNavigation
    },
    {
        headerMode: "none",
        mode: "modal"//화면이 위로 올라오게.
    }
);

export default createAppContainer(MainNavigation);