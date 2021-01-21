import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import SelectPhoto from "../screens/photo/SelectPhoto";
import TakePhoto from "../screens/photo/TakePhoto";
import UploadPhoto from "../screens/photo/UploadPhoto";

const PhotoTabs = createMaterialTopTabNavigator(
    {
        SelectPhoto,
        TakePhoto,
    },
    {
        tabBarPosition: "bottom"
    }
);

export default createStackNavigator({
    PhotoTabs,
    UploadPhoto
},
    {
        mode: "modal"
    }
);