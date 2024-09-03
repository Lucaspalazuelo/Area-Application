import React, {
    FC,
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";
import socketIOClient, { Socket } from "socket.io-client";
import { useToken } from "./TokenContext";

interface ISocketContext {
    socket: Socket | null;
    connected: boolean;
    tokenConnected: boolean;
}

const SocketContext = createContext<ISocketContext>({
    socket: null,
    connected: false,
    tokenConnected: false,
});

interface SocketProviderProps {
    children: ReactNode;
}

export const SocketProvider: FC<SocketProviderProps> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [connected, setConnected] = useState<boolean>(false);
    const [tokenConnected, setTokenConnected] = useState<boolean>(false);
    const { saveToken, getToken } = useToken();

    useEffect(() => {
        const newSocket = socketIOClient("ws://localhost:3002", {
            transports: ["websocket"],
        });

        newSocket.on("connect", () => {
            setConnected(true);
            const token = getToken("token");
            if (token) newSocket.emit("login_token", { token: token });
        });

        newSocket.on("stream_token", (data) => {
            const { token, expires_in, confirmed } = data;
            saveToken("token", token);
            setTokenConnected(confirmed);
        });

        newSocket.on("disconnect", () => {
            setConnected(false);
            setTokenConnected(false);
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket, connected, tokenConnected }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);
