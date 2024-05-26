import axios from "axios"

const rootUrl = "https://historyhunt-5bec8-default-rtdb.europe-west1.firebasedatabase.app";

const storeUser = async (user) => {
    try {
        await axios.post(`${rootUrl}/users.json`, user);
    } catch (error) {
        console.error("Error storing user:", error);
    }
};

const getUser = async (email) => {
    try {
        const response = await axios.get(`${rootUrl}/users.json`);
        const users = response.data;
        for (const key in users) {
            if (users[key].email === email) {
                return users[key];
            }
        }
        return null;
    } catch (error) {
        console.error("Error getting user:", error);
        return null;
    }
};

export { storeUser, getUser };
