import React, { FC, createContext, useState, useContext, ReactNode } from "react";

interface Reaction {
    id: string;
    type: string;
    data: any;
}

interface ReactionsContextType {
    reactions: Reaction[];
    addReaction: (reaction: Reaction) => void;
    removeReaction: (reactionId: string) => void;
}

const ReactionsContext = createContext<ReactionsContextType>({
    reactions: [],
    addReaction: () => {},
    removeReaction: () => {},
});

interface ReactionsProviderProps {
    children: ReactNode;
}

const fakeReactions: Reaction[] = [
    {
        id: "1",
        type: "like",
        data: {
            user: {
                id: "1",
                name: "John",
            },
            post: {
                id: "1",
                title: "My post",
            },
        },
    },
    {
        id: "2",
        type: "like",
        data: {
            user: {
                id: "2",
                name: "Jane",
            },
            post: {
                id: "1",
                title: "My post",
            },
        },
    },
    {
        id: "3",
        type: "like",
        data: {
            user: {
                id: "3",
                name: "Jack",
            },
            post: {
                id: "1",
                title: "My post",
            },
        },
    },
    {
        id: "4",
        type: "like",
        data: {
            user: {
                id: "4",
                name: "Jill",
            },
            post: {
                id: "1",
                title: "My post",
            },
        },
    },
    {
        id: "5",
        type: "like",
        data: {
            user: {
                id: "5",
                name: "Jules",
            },
            post: {
                id: "1",
                title: "My post",
            },
        },
    },
    {
        id: "6",
        type: "like",
        data: {
            user: {
                id: "6",
                name: "Julie",
            },
            post: {
                id: "1",
                title: "My post",
            },
        },
    },
    {
        id: "7",
        type: "like",
        data: {
            user: {
                id: "7",
                name: "Jim",
            },
            post: {
                id: "1",
                title: "My post",
            },
        },
    },
    {
        id: "8",
        type: "like",
        data: {
            user: {
                id: "8",
                name: "Judy",
            },
            post: {
                id: "1",
                title: "My post",
            },
        },
    },
    {
        id: "9",
        type: "like",
        data: {
            user: {
                id: "9",
                name: "Jules",
            },
            post: {
                id: "1",
                title: "My post",
            },
        },
    },
    {
        id: "10",
        type: "like",
        data: {
            user: {
                id: "10",
                name: "Julie",
            },
            post: {
                id: "1",
                title: "My post",
            },
        },
    },
    {
        id: "11",
        type: "like",
        data: {
            user: {
                id: "11",
                name: "Jim",
            },
            post: {
                id: "1",
                title: "My post",
            },
        },
    },
    {
        id: "12",
        type: "like",
        data: {
            user: {
                id: "12",
                name: "Judy",
            },
            post: {
                id: "1",
                title: "My post",
            },
        },
    },
    {
        id: "13",
        type: "like",
        data: {
            user: {
                id: "13",
                name: "Jules",
            },
            post: {
                id: "1",
                title: "My post",
            },
        },
    },
    {
        id: "14",
        type: "like",
        data: {
            user: {
                id: "14",
                name: "Julie",
            },
            post: {
                id: "1",
                title: "My post",
            },
        },
    },
    {
        id: "15",
        type: "like",
        data: {
            user: {
                id: "15",
                name: "Jim",
            },
            post: {
                id: "1",
                title: "My post",
            },
        },
    },
    {
        id: "16",
        type: "like",
        data: {
            user: {
                id: "16",
                name: "Judy",
            },
            post: {
                id: "1",
                title: "My post",
            },
        },
    },
    {
        id: "17",
        type: "like",
        data: {
            user: {
                id: "17",
                name: "Jules",
            },
            post: {
                id: "1",
                title: "My post",
            },
        },
    },
    {
        id: "18",
        type: "like",
        data: {
            user: {
                id: "18",
                name: "Julie",
            },
            post: {
                id: "1",
                title: "My post",
            },
        },
    },
    {
        id: "19",
        type: "like",
        data: {
            user: {
                id: "19",
                name: "Jim",
            },
            post: {
                id: "1",
                title: "My post",
            },
        },
    },
    {
        id: "20",
        type: "like",
        data: {
            user: {
                id: "20",
                name: "Judy",
            },
            post: {
                id: "1",
                title: "My post",
            },
        },
    }
];

export const ReactionsProvider: FC<ReactionsProviderProps> = ({
    children,
}) => {
    const [reactions, setReactions] = useState<Reaction[]>(fakeReactions);

    const addReaction = (reaction: Reaction) => {
        setReactions((currentReactions) => [...currentReactions, reaction]);
    };

    const removeReaction = (reactionId: string) => {
        setReactions((currentReactions) =>
            currentReactions.filter((reaction) => reaction.id !== reactionId)
        );
    };

    return (
        <ReactionsContext.Provider
            value={{ reactions, addReaction, removeReaction }}
        >
            {children}
        </ReactionsContext.Provider>
    );
};

export const useReactions = () => useContext(ReactionsContext);
