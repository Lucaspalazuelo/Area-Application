import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ApiListStackParamList } from "./types";
import ApiListScreen from "../screens/app/ApiList/ApiListScreen";
import ApiDetails from "../screens/app/ApiList/ApiDetails";

const ApiListStack = createNativeStackNavigator<ApiListStackParamList>();

const ApiListNavigator = () => {
    return (
        <ApiListStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="ApiList">
            <ApiListStack.Screen name="ApiList" component={ApiListScreen} />
            <ApiListStack.Screen name="ApiDetails" component={ApiDetails} />
        </ApiListStack.Navigator>
    );
};

export default ApiListNavigator;
