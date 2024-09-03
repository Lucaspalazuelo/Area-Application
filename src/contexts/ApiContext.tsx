import React, {
    FC,
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Api {
    id: number;
    name: string;
    description: string;
    icon: string;
    active: boolean;
    apiKey: string;
}

interface ApiContextType {
    apis: Api[];
    setApis: (apis: Api[]) => void;
    toggleApiActive: (id: number) => void;
    updateApiKey: (id: number, newApiKey: string) => void;
}

const ApiContext = createContext<ApiContextType>({
    apis: [],
    setApis: () => {},
    toggleApiActive: () => {},
    updateApiKey: () => {},
});

interface ApiProviderProps {
    children: ReactNode;
}

const fakeApiData = [
    {
        id: 1,
        name: "Fake Google API",
        description: "Une fausse API pour simuler Google.",
        icon: "google",
        active: true,
        apiKey: "123456789",
    },
    {
        id: 2,
        name: "Fake YouTube API",
        description: "Une fausse API pour simuler YouTube.",
        icon: "youtube",
        active: false,
        apiKey: "123456789",
    },
    {
        id: 3,
        name: "Fake GitHub API",
        description: "Une fausse API pour simuler GitHub.",
        icon: "github",
        active: true,
        apiKey: "123456789",
    },
];

export const ApiProvider: FC<ApiProviderProps> = ({ children }) => {
    const [apis, setApisState] = useState<Api[]>(fakeApiData);

    useEffect(() => {
        const loadApis = async () => {
            const storedApis = await AsyncStorage.getItem("apis");
            if (storedApis) {
                setApisState(JSON.parse(storedApis));
            }
        };

        loadApis();
    }, []);

    const setApis = async (newApis: Api[]) => {
        setApisState(newApis);
        await AsyncStorage.setItem("apis", JSON.stringify(newApis));
    };

    const toggleApiActive = async (id: number) => {
        const updatedApis = apis.map((api) =>
            api.id === id ? { ...api, active: !api.active } : api
        );
        setApisState(updatedApis);
        await AsyncStorage.setItem("apis", JSON.stringify(updatedApis));
    };

    const updateApiKey = async (id: number, newApiKey: string) => {
        const updatedApis = apis.map((api) =>
            api.id === id ? { ...api, apiKey: newApiKey } : api
        );
        if (newApiKey === "") {
            updatedApis[id - 1].active = false;
        }
        setApisState(updatedApis);
        await AsyncStorage.setItem("apis", JSON.stringify(updatedApis));
    };

    return (
        <ApiContext.Provider
            value={{ apis, setApis, toggleApiActive, updateApiKey }}
        >
            {children}
        </ApiContext.Provider>
    );
};

export const useApis = () => useContext(ApiContext);
