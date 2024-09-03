import {
    NavigationProp,
    NavigatorScreenParams,
} from "@react-navigation/native";

export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Main: NavigatorScreenParams<TabStackParamList>;
};

export type TabStackParamList = {
    Home: undefined;
    ApiListStack: NavigatorScreenParams<ApiListStackParamList>;
    ConfigApi: undefined;
    Profile: undefined;
};

export type ApiListStackParamList = {
    ApiList: undefined;
    ApiDetails: { apiId: number };
};
