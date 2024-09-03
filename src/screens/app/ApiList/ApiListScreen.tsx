import React, { FC } from "react";
import { View, StyleSheet, FlatList, Text, SafeAreaView } from "react-native";
import { Card } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationProp } from "@react-navigation/native";
import { ApiListStackParamList } from "../../../navigation/types";
import { useSocket } from "../../../contexts/SocketContext";
import { useApis } from "../../../contexts/ApiContext";
import Colors from "../../../utils/Colors";

interface ApiListScreenProps {
    navigation: NavigationProp<ApiListStackParamList>;
}

const ApiListScreen: FC<ApiListScreenProps> = ({ navigation }) => {
    const { apis } = useApis();

    const renderItem = ({ item }: { item: any }) => (
        <Card
            style={styles.card}
            onPress={() =>
                navigation.navigate("ApiDetails", { apiId: item.id })
            }
            testID="apilist-flatlist"
        >
            <Card.Content style={styles.cardContent}>
                <MaterialCommunityIcons
                    name={item.icon}
                    size={50}
                    color={item.active ? Colors.primary : "#B0B0B0"}
                    style={styles.icon}
                />
                <View style={styles.cardText}>
                    <Text style={styles.cardTitle}>{item.name}</Text>
                    <Text style={styles.cardDescription}>
                        {item.description}
                    </Text>
                </View>
                <View
                    style={[
                        styles.statusIndicator,
                        item.active ? styles.active : styles.inactive,
                    ]}
                />
            </Card.Content>
        </Card>
    );

    return (
        <SafeAreaView style={styles.container} testID="apilist-screen">
            <FlatList
                data={apis}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                // testID="apilist-flatlist"
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: Colors.background,
    },
    card: {
        margin: 5,
        marginBottom: 10,
        borderRadius: 12,
        backgroundColor: Colors.inputBackground,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    cardContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    cardText: {
        flex: 1,
    },
    statusIndicator: {
        width: 15,
        height: 15,
        borderRadius: 7.5,
        marginLeft: 10,
    },
    active: {
        backgroundColor: "green",
    },
    inactive: {
        backgroundColor: "red",
    },
    icon: {
        marginRight: 10,
    },
    cardTitle: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#333",
        padding: 5,
    },
    cardDescription: {
        color: Colors.textPrimary,
        padding: 5,
    },
});

export default ApiListScreen;
