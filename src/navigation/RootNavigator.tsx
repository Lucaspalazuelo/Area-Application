import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import TabNavigator from "./TabNavigator";

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
    return (
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
            <RootStack.Screen name="Login" component={LoginScreen} />
            <RootStack.Screen name="Register" component={RegisterScreen} />
            <RootStack.Screen name="Main" component={TabNavigator} />
        </RootStack.Navigator>
    );
};

export default RootNavigator;
