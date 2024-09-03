import React, { FC } from "react";
import {
    Modal,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Text,
} from "react-native";
import { WebView } from "react-native-webview";
import Colors from "../utils/Colors";

interface OAuthModalProps {
    visible: boolean;
    onClose: () => void;
    url: string;
}

const OAuthModal: FC<OAuthModalProps> = ({ visible, onClose, url }) => {
    return (
        <Modal
            animationType="slide"
            visible={visible}
            onRequestClose={onClose}
            transparent={true}
        >
            <SafeAreaView style={styles.container}>
                <WebView source={{ uri: url }} style={styles.webView} />
                <TouchableOpacity onPress={onClose}>
                    <Text style={styles.closeButton}>Close</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    webView: {
        width: "90%",
        alignSelf: "center",
        borderRadius: 12,
    },
    closeButton: {
        color: Colors.primary,
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 20,
    },
});

export default OAuthModal;
