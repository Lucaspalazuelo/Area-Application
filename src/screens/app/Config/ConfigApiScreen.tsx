import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Colors from "../../../utils/Colors";

const ConfigApiScreen = () => {
    return (
        <View style={styles.container} testID="configapi-screen">
            <Text>🚧Under Development🚧</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default ConfigApiScreen;
