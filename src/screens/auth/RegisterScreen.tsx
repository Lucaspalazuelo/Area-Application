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
import OAuthModal from "../../components/OAuthModal";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/types";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useToken } from "../../contexts/TokenContext";
import { useSocket } from "../../contexts/SocketContext";
import Colors from "../../utils/Colors";

interface RegisterScreenProps {
    navigation: NavigationProp<RootStackParamList>;
}

const RegisterScreen: FC<RegisterScreenProps> = ({ navigation }) => {
    const theme = {
        roundness: 12,
        colors: {
            primary: Colors.primary,
        },
    };
    const { saveToken } = useToken();
    const { socket } = useSocket();

    const [userName, setUserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const validateEmail = (email: string) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const validatePassword = (password: string) => {
        const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimum huit caractères, au moins une lettre et un chiffre
        return re.test(password);
    };

    const handleRegister = () => {
        setIsLoading(true);
        if (!validateEmail(email)) {
            Alert.alert("Invalid Email", "Please enter a valid email address.");
            setIsLoading(false);
            return;
        }
        if (!validatePassword(password)) {
            Alert.alert(
                "Invalid Password",
                "Password must be at least 8 characters long, including at least one letter and one number."
            );
            setIsLoading(false);
            return;
        }
        // saveToken("token");
        socket?.emit("register", {
            userName,
            email,
            password,
        });
        navigation.navigate("Main", { screen: "Home" });
        setIsLoading(false);
    };

    const handleOauthRegister = () => {
        // Continue avec la logique d'inscription Google
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
        >
            <Headline style={styles.headline}>Create an account !</Headline>
            <TextInput
                label="Username"
                mode="outlined"
                style={styles.textInput}
                outlineColor={Colors.shadow}
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={setUserName}
                value={userName}
                theme={theme}
                testID="signup-username"
            />
            <TextInput
                label="Email"
                mode="outlined"
                style={styles.textInput}
                outlineColor={Colors.shadow}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={setEmail}
                value={email}
                theme={theme}
                testID="signup-email"
            />
            <TextInput
                label="Password"
                mode="outlined"
                style={styles.textInput}
                outlineColor={Colors.shadow}
                secureTextEntry
                onChangeText={setPassword}
                value={password}
                theme={theme}
                testID="signup-password"
            />
            <Button
                mode="contained"
                onPress={handleRegister}
                style={styles.registerButton}
                labelStyle={styles.buttonText}
                testID="signup-button"
            >
                {isLoading ? (
                    <ActivityIndicator color={"white"} size={"small"} />
                ) : (
                    "Sign up"
                )}
            </Button>
            <Button
                mode="outlined"
                onPress={handleOauthRegister}
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
                    "Sign up with Google"
                )}
            </Button>
            {modalVisible && (
                <OAuthModal
                    visible={modalVisible}
                    onClose={onModalClose}
                    url="https://google.com"
                />
            )}
            <View style={styles.signinContainer}>
                <Text style={styles.signinText}>
                    Already have an account ?{" "}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.signinButton}>Sign in !</Text>
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
    registerButton: {
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
    signinContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
    },
    signinText: {
        color: Colors.textPrimary,
        fontSize: 14,
    },
    signinButton: {
        color: Colors.primary,
        fontSize: 14,
        fontWeight: "bold",
    },
});

export default RegisterScreen;
