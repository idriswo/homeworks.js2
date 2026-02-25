import { DeleteUser, PostUser, EditUser } from "./api.js"

let addUser = document.querySelector(".addUser")
let box = document.querySelector(".box")
let addDialog = document.querySelector(".addDialog")
let addForm = document.querySelector(".addForm")
let editDialog = document.querySelector(".editDialog")
let editForm = document.querySelector(".editForm")
let idx = null;


addUser.onclick = () => {
    addDialog.show()
}


addForm.onsubmit = (event) => {
    event.preventDefault()
    let user = {
        image: addForm["image"].value,
        name: addForm["name"].value,
        Categories: addForm["Categories"].value,
        employed: addForm["employed"].value
    }
    PostUser(user)
    addForm.reset()
    addDialog.close()
}


editForm.onsubmit = (e) => {
    e.preventDefault()
    let obj = {
        id: idx,
        image: editForm["image"].value,
        name: editForm["name"].value,
        Categories: editForm["Categories"].value,
        employed: editForm["Categories"].value,
        status: editForm["select"].value === "true" 
    }
    EditUser(obj)
    editForm.reset()
    editDialog.close()
}


function ShowUser(data) {
    box.innerHTML = ""
    data.forEach((e, i) => {
        let tr = document.createElement("tr")
        tr.innerHTML = ` <td><img class="img1" src="${e.image}" alt=""> ${e.name}</td>
                <td>${e.Categories}</td>
                <td>${e.status == true ? "ONLINE" : "OFFLINE"} </td>
                <td>${e.employed}</td>
                <td>
                    <button  class="btnDelete">🗑️</button>
                    <button class="btnEdit">🖊️</button>
                </td>`
        let img1 = tr.querySelector(".img1")
        let btnDelete = tr.querySelector(".btnDelete")
        let btnEdit = tr.querySelector(".btnEdit")
        btnDelete.onclick = () => {
            DeleteUser(e.id)
        }
        btnEdit.onclick = () => {
            idx = e.id
            editDialog.show()
            editForm["image"].value = e.image
            editForm["name"].value = e.name
            editForm["Categories"].value = e.Categories
            editForm["employed"].value = e.employed
            editForm["select"].value = e.status ? "true" : "false"
        }
        img1.classList.add = "img1"
        box.appendChild(tr)

    });
}

export { ShowUser }