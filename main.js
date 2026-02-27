import { DeleteUSer, EditUser, AddUser } from "./api.js"

let openDialog = document.querySelector(".openDialog")
let addDialog = document.querySelector(".addDialog")
let addForm = document.querySelector(".addForm")
let box = document.querySelector(".box")

let editDialog = document.querySelector(".editDialog")
let editForm = document.querySelector(".editForm")
let idx = null



openDialog.onclick = () => {
    addDialog.showModal()
}

addForm.onsubmit = (event) => {
    event.preventDefault()
    let user = {
        avatar: addForm["avatar"].value,
        name: addForm["name"].value,
        birthdate: addForm["birthdate"].value,
        role: addForm["role"].value,
        status: addForm["status"].value == "true"
    }
    AddUser(user)
    addDialog.close()
    addForm.reset()
}

editForm.onsubmit = (event) => {
    event.preventDefault()

    let updatedUser = {
        ...idx,
        avatar: editForm["avatar"].value,
        name: editForm["name"].value,
        birthdate: editForm["birthdate"].value,
        role: editForm["role"].value,
        status: editForm["status"].value === "true"
    }

    EditUser(updatedUser)
    editDialog.close()
}


function ShowUSers(data) {
    box.innerHTML = ""
    data.forEach((el, i) => {
        const tr = document.createElement("tr")
        tr.innerHTML = `
        <td>${el.id}</td>
        <td><img style="width: 30px; border-radius: 50%" src="${el.avatar}"/> ${el.name} </td>
        <td>${el.birthdate}</td>
        <td>${el.role}</td>
        <td>
        ${el.status
                ? "<span style='color:green'>Active</span>"
                : "<span style='color:red'>Inactive</span>"}
            </td>
            <td>
            <button class="btnDelete">🗑️</button>
            <button class="btnEdit">🖋️</button>
            </td>
            `
        let btnDelete = tr.querySelector(".btnDelete")
        let btnEdit = tr.querySelector(".btnEdit")
        btnDelete.classList.add = "btnDelete"
        btnEdit.classList.add = "btnEdit"
        btnDelete.onclick = () => {
            DeleteUSer(el.id)
        }
  
        btnEdit.onclick = () => {
            idx = el

            editForm["avatar"].value = el.avatar
            editForm["name"].value = el.name
            editForm["birthdate"].value = el.birthdate
            editForm["role"].value = el.role
            editForm["status"].value = el.status.toString()

            editDialog.showModal()
        }
        box.appendChild(tr)
    });
}

export { ShowUSers }