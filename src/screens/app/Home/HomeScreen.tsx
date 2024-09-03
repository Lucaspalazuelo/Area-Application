import React, { FC, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    Modal,
    StyleSheet,
    SafeAreaView,
} from "react-native";
import { IconButton, Badge } from "react-native-paper";
import { NavigationProp } from "@react-navigation/native";
import { TabStackParamList } from "../../../navigation/types";
import { useReactions } from "../../../contexts/ReactionContext";
import Colors from "../../../utils/Colors";

interface HomeScreenProps {
    navigation: NavigationProp<TabStackParamList>;
}

const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
    const { reactions } = useReactions();
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    return (
        <SafeAreaView style={styles.container} testID="home-screen">
            <View style={styles.notificationIcon}>
                <IconButton
                    icon="bell"
                    size={30}
                    onPress={() => setModalVisible(true)}
                />
                {reactions.length > 0 && (
                    <Badge size={20} style={styles.badge}>
                        {reactions.length}
                    </Badge>
                )}
            </View>
            <Modal
                visible={modalVisible}
                onDismiss={() => setModalVisible(false)}
                transparent={true}
                animationType="slide"
            >
                <View style={styles.modalView}>
                    <IconButton
                        icon="close"
                        size={24}
                        onPress={() => setModalVisible(false)}
                        style={styles.closeButton}
                    />
                    <ScrollView>
                        {reactions.map((reaction, index) => (
                            <View key={index} style={styles.reactionItem}>
                                <Text>{reaction.type}</Text>
                                {/* tu peux ajouter ici tout ce que tu veux */}
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        alignItems: "center",
        justifyContent: "center",
    },
    notificationIcon: {
        position: "absolute",
        top: 45,
        right: 10,
    },
    badge: {
        position: "absolute",
        top: 5,
        right: 4,
        backgroundColor: Colors.primary,
    },
    modalView: {
        marginHorizontal: 20,
        height: "70%",
        marginTop: "auto",
        marginBottom: "auto",
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    closeButton: {
        position: "absolute",
        top: 5,
        right: 5,
    },
    reactionItem: {
        marginBottom: 10,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
});

export default HomeScreen;
