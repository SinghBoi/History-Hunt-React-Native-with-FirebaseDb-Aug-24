import { createContext, useEffect, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid'
import { getUser, storeUser, getUsers, getAllUsers } from '../util/http';


export const UserContext = createContext({
    users: [],
    addUser: ({ email, fullName, password }) => {},
    findUser: async (email) => { },
    updateUser: (id, updatedUser) => {},
});

const userReducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            const id = uuidv4();
            return [{ id, ...action.payload }, ...state];
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

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await getAllUsers();
                dispatch({ type: "SET", payload: fetchedUsers });
            } catch (error) {
                console.error("Failed to fetch users:", error);
            }
        };

        fetchUsers();
    }, []);
    
    const addUser = async (user) => {
        await storeUser(user);
        dispatch({ type: "ADD", payload: user });
    };

    const findUser = async (email) => {
        return await getUser(email);
    };

    const updateUser = (id, user) => {
        dispatch({ type: "UPDATE", payload: { id, data: user } });
    };

    const value = {
        users,
        addUser,
        findUser,
        updateUser
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
