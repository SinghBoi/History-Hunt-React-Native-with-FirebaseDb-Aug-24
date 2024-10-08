import { createContext, useEffect, useReducer, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'
import * as http  from '../util/http';


export const UserContext = createContext({
    users: [],
    addUser: ({ email, fullName, password, imageUrl, plannedHunts, activeHunts }) => {},
    findUser: async (email) => { },
    updateUser: (id, updatedUser) => {},
});

const userReducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [action.payload, ...state];
        case "SET":
            return action.payload;
        case "UPDATE":
            const index = state.findIndex((usr) => usr.id === action.payload.id);
            const user = state[index];
            const updatedUser = { ...user, ...action.payload.data };
            const updatedUsers = [...state];
            updatedUsers[index] = updatedUser;
            return updatedUsers; 
        default:
            return state;
    }
};

const UserContextProvider = ({ children }) => {
    const [users, dispatch] = useReducer(userReducer, []);
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await http.getAllUsers();
                dispatch({ type: 'SET', payload: Object.keys(fetchedUsers).map(key => ({ id: key, ...fetchedUsers[key] })) });
            } catch (error) {
                console.error("Failed to fetch users:", error);
            }
        };

        fetchUsers();
    }, []);

    
    const addUser = async (user) => {
        dispatch({ type: "ADD", payload: user });
    };


    const findUser = async (email) => {
        return await http.getUser(email);
    };

    const updateUser = async (id, user) => {
        dispatch({ type: "UPDATE", payload: { id, data: user } });        
    };

    const value = {
        users,
        loggedInUser,
        setLoggedInUser,
        addUser,
        findUser,
        updateUser
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
