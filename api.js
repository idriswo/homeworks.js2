import { ShowUsers } from "./main.js";

let api = "http://localhost:3001/users";

async function GetUser(value) {
  try {
    const response = await axios.get(value?.length>0?`${api}?name=${value}`:api);
    ShowUsers(response.data);
  } catch (error) {
    console.log(error);
  }
}

async function DeleteUser(id) {
  try {
    await axios.delete(`${api}/${id}`);
    GetUser();
  } catch (error) {
    console.log(error);
  }
}

async function PostUser(user) {
  try {
    await axios.post(api, user);
    GetUser();
  } catch (error) {
    console.log(error);
  }
}

async function EditUser(user) {
  try {
    await axios.put(`${api}/${user.id}`, user);
    GetUser();
  } catch (error) {
    console.log(error);
  }
}

GetUser();

export { DeleteUser, PostUser, EditUser , GetUser};