import { createContext } from 'react';


export const HuntContext = createContext({
    hunts: [],
    addHunt: ({ huntDuration, name, huntImageUri, destination }) => { },
    findHunt: async (huntName) => { },
});

const HuntReducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [action.payload, ...state];
        case "SET":
            return action.payload;
        default:
            return state;
    }
};

const HuntContextProvider = ({ children }) => {
    const [hunts, dispatch] = useReducer(HuntReducer, []);
    
    const addHunt = async (Hunt) => {
        dispatch({ type: "ADD", payload: Hunt });
    };

        const findHunt = async (huntName) => {
        return await http.getHunt(huntName);
    };

    const value = {
        hunts,
        addHunt,
        findHunt,
    };

    return <HuntContext.Provider value={value}>{children}</HuntContext.Provider>;
};

export default HuntContextProvider;
