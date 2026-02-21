import { ShowUSers } from "./main.js";

let api = "https://6993281d8f29113acd402be0.mockapi.io/usermanagement"


async function GetUser() {
    try {
        let { data } = await axios.get(api)
        ShowUSers(data)
    } catch (error) {
        console.error(error);

    }
}

async function DeleteUSer(id) {
    try {
          await axios.delete(`${api}/${id}`)
        GetUser()
    } catch (error) {
        console.error(error);

    }
}

async function EditUser(user) {
    try {
          await axios.put(`${api}/${user.id}`, user)
        GetUser()
    } catch (error) {
        console.error(error);

    }
}


async function AddUser(user) {
    try {
          await axios.post(api, user)
        GetUser()
    } catch (error) {
        console.error(error);

    }
}


GetUser()

export{DeleteUSer, EditUser, AddUser}