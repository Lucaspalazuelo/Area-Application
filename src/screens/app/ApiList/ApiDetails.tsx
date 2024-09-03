import React, { FC, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { ApiListStackParamList } from "../../../navigation/types";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useApis } from "../../../contexts/ApiContext";
import { Button } from "react-native-paper";
import Colors from "../../../utils/Colors";

interface ApiDetailsScreenProps {
    route: RouteProp<ApiListStackParamList, "ApiDetails">;
    navigation: NavigationProp<ApiListStackParamList>;
}

const ApiDetailsScreen: FC<ApiDetailsScreenProps> = ({ route, navigation }) => {
    const { apiId } = route.params;
    const { apis, toggleApiActive, updateApiKey } = useApis();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    console.log(apiId);

    const apiData = apis.find((api) => api.id === apiId);
    console.log(apiData);

    const handleToggleApiActive = () => {
        toggleApiActive(apiId);
    };

    const handleResetApiKey = () => {
        updateApiKey(apiId, "");
    };

    const handleOauthLogin = () => {
        // Continue avec la logique de connexion Google
        setIsLoading(true);
        updateApiKey(apiId, "token");
        setIsLoading(false);
    };

    if (!apiData) {
        return (
            <SafeAreaView style={styles.container}>
                <Text>API not found</Text>
            </SafeAreaView>
        );
    }
    console.log(apiData.apiKey);

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <MaterialCommunityIcons
                    name="arrow-left"
                    size={40}
                    color={Colors.primary}
                />
            </TouchableOpacity>
            <MaterialCommunityIcons
                name={apiData.icon}
                size={100}
                color={apiData.active ? Colors.primary : "#B0B0B0"}
                style={{
                    ...styles.apiIcon,
                    shadowColor: apiData.active ? Colors.primary : "#B0B0B0",
                }}
            />
            <Text style={styles.title}>{apiData.name}</Text>
            <Text style={styles.description}>{apiData.description}</Text>
            {apiData.apiKey ? (
                <TouchableOpacity
                    style={styles.toggleButton}
                    onPress={handleToggleApiActive}
                >
                    <MaterialCommunityIcons
                        name={
                            apiData?.active
                                ? "toggle-switch"
                                : "toggle-switch-off-outline"
                        }
                        size={50}
                        color={apiData.active ? "#4CAF50" : "#F44336"}
                    />
                </TouchableOpacity>
            ) : (
                <Button
                    mode="outlined"
                    onPress={handleOauthLogin}
                    style={styles.OauthButton}
                    icon={() => (
                        <MaterialCommunityIcons
                            name={apiData.icon}
                            size={35}
                            color={Colors.primary}
                        />
                    )}
                    labelStyle={styles.OauthButtonText}
                >
                    {isLoading ? (
                        <ActivityIndicator
                            color={Colors.primary}
                            size={"small"}
                        />
                    ) : (
                        `Sign in with ${apiData.name} to activate`
                    )}
                </Button>
            )}
            <View style={styles.resetButtonContainer}>
                <TouchableOpacity
                    style={styles.resetButton}
                    onPress={handleResetApiKey}
                >
                    <Text style={styles.resetButtonText}>Reset API</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginVertical: 20,
    },
    description: {
        fontSize: 16,
        color: Colors.neutralDark,
        marginBottom: 30,
        textAlign: "center",
    },
    toggleButton: {
        flexDirection: "row",
        alignItems: "center",
        width: "30%",
        justifyContent: "center",
        padding: 10,
        borderRadius: 25,
        backgroundColor: "#E0E0E0",
        marginTop: 20,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    toggleButtonText: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: "bold",
    },
    apiIcon: {
        marginVertical: 20,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    backButton: {
        position: "absolute",
        top: 60,
        left: 10,
        padding: 10,
    },
    OauthButton: {
        marginVertical: 30,
        borderRadius: 12,
        justifyContent: "center",
        width: "85%",
        backgroundColor: Colors.inputBackground,
        borderColor: Colors.shadow,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 2,
    },
    OauthButtonText: {
        color: Colors.neutralDark,
        fontSize: 13,
        fontWeight: "500",
        textAlign: "center",
    },
    resetButtonContainer: {
        flex: 1,
        justifyContent: "flex-end",
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    resetButton: {
        marginTop: 20,
        backgroundColor: Colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3,
    },
    resetButtonText: {
        color: Colors.inputBackground,
        fontSize: 16,
        fontWeight: "bold",
    },
    resetMessage: {
        color: "#4CAF50",
        fontSize: 14,
        marginTop: 10,
    },
});

export default ApiDetailsScreen;
