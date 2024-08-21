import axios from "axios"

const rootUrl = "https://history-hunt-project-default-rtdb.europe-west1.firebasedatabase.app";

//function to save a new user
const storeUser = async (user) => {
    try {
        const response = await axios.post(`${rootUrl}/users.json`, user);
        const userId = response.data.name;
        console.log(userId)
        return userId;
    } catch (error) {
        console.error("Error storing user:", error);
        throw error; 
    }
};

// Function to find a user with email
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


// Function to find a userId
const getUserId = async (email) => {
    try {
        const response = await axios.get(`${rootUrl}/users.json`);
        const users = response.data;
        for (const key in users) {
            if (users[key].email === email) {
                return key;
            }
        }
        return null;
    } catch (error) {
        console.error("Error getting Id:", error);
        return null;
    }
};

// Function to get all users
const getAllUsers = async () => {
    try {
        const response = await axios.get(`${rootUrl}/users.json`);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Failed to fetch users");
    }
};

// Function to update a user
const updateUser = async (userId, updatedUser) => {
    try {
        await axios.patch(`${rootUrl}/users/${userId}.json`, updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
    }
};

//function to create hunt
const createHunt = async (hunt) => {
    try {
        const response = await axios.post(`${rootUrl}/hunts.json`, hunt);
        const huntId = response.data.name;
        return huntId;
    } catch (error) {
        console.error("Error creating hunt:", error);
        throw error; 
    }
};


// Function to get a hunt with hunt Name
const getHunt = async (huntName) => {
    try {
        const response = await axios.get(`${rootUrl}/hunts.json`);
        const hunts = response.data;
        for (const key in hunts) {
            if (hunts[key].huntName === huntName) {
                return hunts[key];
            }
        }
        return null;
    } catch (error) {
        console.error("Error getting hunt:", error);
        return null;
    }
};

export { storeUser, getUser, getAllUsers, getUserId, updateUser, createHunt, getHunt };
