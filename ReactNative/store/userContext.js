import { createContext, useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'

const USERDB = [
  {
    id: "m1",
    email: "meena@gmail.com",
    fullName: "meena Dhaka",
    password: "meena123",
  },
];

export const UserContext = createContext({
    users: [],
    addUser: ({ email, fullName, password }) => { },    
})

const userReducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            const id = uuidv4();
            return [{ id, ...action.payload }, ...state]
        default:
            return state
    }
}

const UserContextProvider = ({ children })=> {
    const [users, dispatch] = useReducer(userReducer, USERDB)
    const addUser = (user) => {
        dispatch({type: "ADD", payload: user})
    }

    const value = {
        users,
        addUser,
    }
    return <UserContext.Provider value ={value}>{children}</UserContext.Provider>
}

export default UserContextProvider