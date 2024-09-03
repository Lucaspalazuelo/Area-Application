import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import HomeScreen from "../screens/app/Home/HomeScreen";
import ApiListScreen from "../screens/app/ApiList/ApiListScreen";
import ConfigApiScreen from "../screens/app/Config/ConfigApiScreen";
import ProfileScreen from "../screens/app/Profile/ProfileScreen";
import ApiListNavigator from "./ApiListNavigator";
import { TabStackParamList } from "./types";
import Colors from "../utils/Colors";

const Tab = createBottomTabNavigator<TabStackParamList>();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: Colors.shadow,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let iconComponent;
                    let iconSize: number = size * 1.3;

                    switch (route.name) {
                        case "Home":
                            iconName = focused ? "home" : "home-outline";
                            iconComponent = (
                                <Ionicons
                                    name={iconName}
                                    size={iconSize}
                                    color={color}
                                    style={{ paddingTop: 10 }}
                                />
                            );
                            break;
                        case "ApiListStack":
                            iconName = focused ? "list" : "list-outline";
                            iconComponent = (
                                <Ionicons
                                    name={iconName}
                                    size={iconSize}
                                    color={color}
                                    style={{ paddingTop: 10 }}
                                />
                            );
                            break;
                        case "ConfigApi":
                            iconName = focused
                                ? "settings"
                                : "settings-outline";
                            iconComponent = (
                                <Ionicons
                                    name={iconName}
                                    size={iconSize}
                                    color={color}
                                    style={{ paddingTop: 10 }}
                                />
                            );
                            break;
                        case "Profile":
                            iconName = focused ? "person" : "person-outline";
                            iconComponent = (
                                <Ionicons
                                    name={iconName}
                                    size={iconSize}
                                    color={color}
                                    style={{ paddingTop: 10 }}
                                />
                            );
                            break;
                        default:
                            iconComponent = (
                                <Ionicons
                                    name="alert-circle-outline"
                                    size={iconSize}
                                    color={color}
                                    style={{ paddingTop: 10 }}
                                />
                            );
                    }
                    return iconComponent;
                },
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{ tabBarTestID: "tab-home" }}
            />
            <Tab.Screen
                name="ApiListStack"
                component={ApiListNavigator}
                options={{ tabBarTestID: "tab-apilist" }}
            />
            <Tab.Screen
                name="ConfigApi"
                component={ConfigApiScreen}
                options={{ tabBarTestID: "tab-configapi" }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ tabBarTestID: "tab-profile" }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigator;
