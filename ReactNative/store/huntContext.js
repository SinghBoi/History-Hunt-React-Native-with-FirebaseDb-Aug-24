import { createContext } from 'react';


export const HuntContext = createContext({
    Hunts: [],
    addHunt: ({huntDuration, name, huntImageUri, destination }) => {}
});

const HuntReducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [action.payload, ...state];
        default:
            return state;
    }
};

const HuntContextProvider = ({ children }) => {
    
    const addHunt = async (Hunt) => {
        dispatch({ type: "ADD", payload: Hunt });
    };

    const value = {
        Hunts,
        addHunt,
    };

    return <HuntContext.Provider value={value}>{children}</HuntContext.Provider>;
};

export default HuntContextProvider;
