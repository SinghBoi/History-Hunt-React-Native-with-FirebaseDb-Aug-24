import { createContext } from 'react';


export const HuntContext = createContext({
    hunts: [],
    addHunt: ({huntDuration, name, huntImageUri, destination }) => {}
});

const HuntReducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [action.payload, ...state];
        case "UPDATE":
            return state.map(hunt =>
                hunt.id === action.payload.id ? { ...hunt, ...action.payload.data } : hunt
            );
        default:
            return state;
    }
};

const HuntContextProvider = ({ children }) => {
    const [hunts, dispatch] = useReducer(HuntReducer, []);
    
    const addHunt = async (Hunt) => {
        dispatch({ type: "ADD", payload: Hunt });
    };

    const updateHunt = async (id, huntData) => {
        dispatch({ type: "UPDATE", payload: { id, data: huntData } });        
    };

    const value = {
        hunts,
        addHunt,
        updateHunt,
    };

    return <HuntContext.Provider value={value}>{children}</HuntContext.Provider>;
};

export default HuntContextProvider;
