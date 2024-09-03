import React, { FC, useState } from "react";
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Text,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { Button, TextInput, Headline } from "react-native-paper";
import OAuthModal from "../../components/OAuthModal";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/types";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useToken } from "../../contexts/TokenContext";
import { useSocket } from "../../contexts/SocketContext";
import Colors from "../../utils/Colors";

interface LoginScreenProps {
    navigation: NavigationProp<RootStackParamList>;
}

const LoginScreen: FC<LoginScreenProps> = ({ navigation }) => {
    const theme = {
        roundness: 12,
        colors: {
            primary: Colors.primary,
        },
    };
    const { saveToken } = useToken();
    const { socket } = useSocket();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const handleLogin = () => {
        // Continue avec la logique de connexion
        setIsLoading(true);
        // saveToken("token");
        socket?.emit("login", {
            email,
            password,
        });
        navigation.navigate("Main", { screen: "Home" });
        setIsLoading(false);
    };

    const handleOauthLogin = () => {
        // Continue avec la logique de connexion Google
        setIsLoading(true);
        setModalVisible(true);
        // saveToken("token");
        // navigation.navigate("Main", { screen: "Home" });
        setIsLoading(false);
    };

    const onModalClose = () => {
        setModalVisible(false);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            testID="login-screen"
        >
            <Headline style={styles.headline}>
                Welcome !
            </Headline>
            <TextInput
                label="Email"
                mode="outlined"
                style={styles.textInput}
                keyboardType="email-address"
                autoCapitalize="none"
                outlineColor={Colors.shadow}
                onChangeText={setEmail}
                value={email}
                theme={theme}
                testID="login-email"
            />
            <TextInput
                label="Password"
                mode="outlined"
                style={styles.textInput}
                secureTextEntry
                outlineColor={Colors.shadow}
                onChangeText={setPassword}
                value={password}
                theme={theme}
                testID="login-password"
            />
            <Button
                mode="contained"
                onPress={handleLogin}
                style={styles.loginButton}
                labelStyle={styles.buttonText}
                testID="login-button"
            >
                {isLoading ? (
                    <ActivityIndicator color={"white"} size={"small"} />
                ) : (
                    "Sign in"
                )}
            </Button>
            <Button
                mode="outlined"
                onPress={handleOauthLogin}
                style={styles.OauthButton}
                icon={() => (
                    <MaterialCommunityIcons
                        name="google"
                        size={20}
                        color={Colors.primary}
                    />
                )}
                labelStyle={styles.OauthButtonText}
            >
                {isLoading ? (
                    <ActivityIndicator color={Colors.primary} size={"small"} />
                ) : (
                    "Sign in with Google"
                )}
            </Button>
            {modalVisible && (
                <OAuthModal
                    visible={modalVisible}
                    onClose={onModalClose}
                    url="https://google.com"
                />
            )}
            <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Don’t have an account ? </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Register")}
                    testID="signup-button"
                >
                    <Text style={styles.signupButton}>Sign up for free !</Text>
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
    inputText: {
        color: Colors.textPrimary,
        fontSize: 14,
        fontWeight: "300",
    },
    loginButton: {
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
    registerButton: {
        marginVertical: 10,
        borderRadius: 5,
        width: "100%",
        borderColor: Colors.secondary,
    },
    buttonText: {
        color: "white",
        fontSize: 14,
        fontWeight: "500",
    },
    OauthButton: {
        marginVertical: 10,
        borderRadius: 12,
        width: "100%",
        backgroundColor: Colors.inputBackground,
        borderColor: Colors.shadow,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 2,
    },
    OauthButtonText: {
        color: "black",
        fontSize: 14,
        fontWeight: "500",
    },
    signupContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
    },
    signupText: {
        color: Colors.textPrimary,
        fontSize: 14,
    },
    signupButton: {
        color: Colors.primary,
        fontSize: 14,
        fontWeight: "bold",
    },
});

export default LoginScreen;
