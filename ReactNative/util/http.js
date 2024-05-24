import axios from "axios"

const rootUrl = "https://historyhunt-5bec8-default-rtdb.europe-west1.firebasedatabase.app";

const storeUser = (user) => {
    axios.post(`${ rootUrl }/users.json`, user);
    
}

export { storeUser };