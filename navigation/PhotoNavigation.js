import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import SelectPhoto from "../screens/photo/SelectPhoto";
import TakePhoto from "../screens/photo/TakePhoto";
import UploadPhoto from "../screens/photo/UploadPhoto";
import styles from '../styles';

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

            // tabStyle: focus ? { backgroundColor: styles.navyColor } : { backgroundColor: styles.searchColor },
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
            title: "Choose Photo"
        }
    },
    UploadPhoto
},
    {
        mode: "modal"
    }
);