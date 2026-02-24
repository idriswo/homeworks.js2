import { ShowUsers } from "./main.js";

let json = "http://localhost:3001/product"



async function GetUser() {
  try {
    let response = await fetch(json)
    let data = await response.json()
    ShowUsers(data) 
  } catch (error) {
    console.log(error);
  }
}
async function DeleteUser(id) {
  try {
    await fetch(`${json}/${id}`, {
      method : "DELETE"
    })
  } catch (error) {
    console.log(error);
    
  }
  GetUser()
}

GetUser()
export {DeleteUser}