import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Signup from "../screens/auth/Signup";
import Confirm from "../screens/auth/Confirm";
import Login from "../screens/auth/Login";
import AuthHome from "../screens/auth/AuthHome";
const AuthNavigation = createStackNavigator(
    {
        Login,
        AuthHome,
        Signup,
        Confirm
    },
    {
        headerMode: "none"
    }
);

export default createAppContainer(AuthNavigation);