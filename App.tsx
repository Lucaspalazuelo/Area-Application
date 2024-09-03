import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigation/RootNavigator";
import { SocketProvider } from "./src/contexts/SocketContext";
import { TokenProvider } from "./src/contexts/TokenContext";
import { ApiProvider } from "./src/contexts/ApiContext";
import { ReactionsProvider } from "./src/contexts/ReactionContext";

export default function App() {
    return (
        <NavigationContainer>
            <TokenProvider>
                <SocketProvider>
                    <ReactionsProvider>
                        <ApiProvider>
                            <RootNavigator />
                        </ApiProvider>
                    </ReactionsProvider>
                </SocketProvider>
            </TokenProvider>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
