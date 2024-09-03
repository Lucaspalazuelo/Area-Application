import React, {
    FC,
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface StorageContextType {
    token: string | null;
    saveToken: (tokenName: string, newToken: string) => Promise<void>;
    removeToken: (tokeName: string) => Promise<void>;
    getToken: (tokenName: string) => Promise<string | null>;
}

const StorageContext = createContext<StorageContextType>({
    token: null,
    saveToken: async () => {},
    removeToken: async () => {},
    getToken: async () => null,
});

interface TokenProviderProps {
    children: ReactNode;
}

export const TokenProvider: FC<TokenProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const loadToken = async () => {
            const storedToken = await AsyncStorage.getItem("userToken");
            if (storedToken) {
                setToken(storedToken);
            }
        };

        loadToken();
    }, []);

    const saveToken = async (tokenName: string, newToken: string) => {
        setToken(newToken);
        await AsyncStorage.setItem(tokenName, newToken);
    };

    const removeToken = async (tokenName: string) => {
        setToken(null);
        await AsyncStorage.removeItem(tokenName);
    };

    const getToken = async (tokenName: string) => {
        const storedToken = await AsyncStorage.getItem(tokenName);
        return storedToken;
    };

    return (
        <StorageContext.Provider
            value={{ token, saveToken, removeToken, getToken }}
        >
            {children}
        </StorageContext.Provider>
    );
};

export const useToken = () => useContext(StorageContext);
