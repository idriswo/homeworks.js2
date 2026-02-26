import { ShowUser } from "./main.js";
let api = "http://localhost:3001/data"


async function GetUsers(value) {
  try {
   let {data} = await axios.get(value?.length>0?`${api}?name=${value}`:api)
   ShowUser(data)
  } catch (error) {
    console.log(error);
  }
}


async function DeleteUser(id) {
  try {
    await axios.delete(`${api}/${id}`)
    GetUsers()
  } catch (error) {
    console.log(error);
  }
}

async function PostUser(user) {
  try {
    await axios.post(api, user)
    GetUsers()
  } catch (error) {
    console.log(error);
  }
}

async function EditUser(user) {
  try {
    await axios.put(`${api}/${user.id}`, user)
    GetUsers()
  } catch (error) {
    console.log(error);
  }
}

GetUsers()

export {DeleteUser,PostUser,EditUser,GetUsers}