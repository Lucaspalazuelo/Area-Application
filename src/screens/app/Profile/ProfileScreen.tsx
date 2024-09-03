import React, { FC, useState } from "react";
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Text,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from "react-native";
import { Button, TextInput, Headline } from "react-native-paper";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigation/types";
import { useToken } from "../../../contexts/TokenContext";
import { useSocket } from "../../../contexts/SocketContext";
import Colors from "../../../utils/Colors";

interface ProfileScreenProps {
    navigation: NavigationProp<RootStackParamList>;
}

const ProfileScreen: FC<ProfileScreenProps> = ({ navigation }) => {
    const theme = {
        roundness: 12,
        colors: {
            primary: Colors.primary,
        },
    };
    const { saveToken, removeToken } = useToken();

    const [curentPassword, setCurentPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const validatePassword = (password: string) => {
        const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimum huit caractères, au moins une lettre et un chiffre
        return re.test(password);
    };

    const validateCurrentPassword = (password: string) => {
        // Logique pour valider le mot de passe actuel
        return true;
    };

    const handleChangePassword = () => {
        // Logique pour changer le mot de passe
        setIsLoading(true);
        const isCurrentPasswordValid = validateCurrentPassword(curentPassword);
        if (!isCurrentPasswordValid) {
            Alert.alert(
                "Invalid Password",
                "Please enter your current password."
            );
            setIsLoading(false);
            return;
        }
        if (!validatePassword(curentPassword)) {
            Alert.alert(
                "Invalid Password",
                "Password must be at least 8 characters long, including at least one letter and one number."
            );
            setIsLoading(false);
            return;
        }
        if (curentPassword === newPassword) {
            Alert.alert(
                "Invalid Password",
                "New password must be different from current password."
            );
            setIsLoading(false);
            return;
        }
        Alert.alert("Success", "Password changed successfully.");
        setIsLoading(false);
        setCurentPassword("");
        setNewPassword("");
    };

    const handleLogout = () => {
        // Logique pour la déconnexion
        // removeToken();
        navigation.navigate("Login");
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.content} testID="profile-screen">
                <Headline style={styles.headline}>Profile</Headline>

                <TextInput
                    label="Current password"
                    mode="outlined"
                    style={styles.textInput}
                    outlineColor={Colors.shadow}
                    secureTextEntry
                    onChangeText={setCurentPassword}
                    value={curentPassword}
                    theme={theme}
                    testID="profile-current-password"
                />
                <TextInput
                    label="New password"
                    mode="outlined"
                    style={styles.textInput}
                    outlineColor={Colors.shadow}
                    secureTextEntry
                    onChangeText={setNewPassword}
                    value={newPassword}
                    theme={theme}
                    testID="profile-new-password"
                />
                <Button
                    mode="contained"
                    onPress={handleChangePassword}
                    style={styles.actionButton}
                    labelStyle={styles.buttonText}
                    testID="profile-change-password"
                >
                    {isLoading ? (
                        <ActivityIndicator color={"white"} size={"small"} />
                    ) : (
                        "Change password"
                    )}
                </Button>
            </View>
            <View style={styles.logoutContainer}>
                <TouchableOpacity
                    onPress={handleLogout}
                    testID="profile-logout"
                >
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    content: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    headline: {
        marginBottom: 140,
        color: Colors.primary,
        fontWeight: "bold",
        fontSize: 30,
    },
    textInput: {
        width: "100%",
        marginVertical: 10,
        borderRadius: 12,
        backgroundColor: Colors.inputBackground,
        borderColor: Colors.shadow,
        color: Colors.textPrimary,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    actionButton: {
        marginTop: 40,
        marginVertical: 10,
        borderRadius: 12,
        width: "100%",
        backgroundColor: Colors.primary,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        color: "white",
        fontSize: 14,
        fontWeight: "500",
    },
    buttonTextOutlined: {
        color: Colors.primary,
        fontSize: 14,
        fontWeight: "500",
    },
    logoutContainer: {
        alignSelf: "stretch",
        justifyContent: "flex-end",
        marginBottom: 20,
    },
    logoutText: {
        color: Colors.primary,
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default ProfileScreen;
