import { DeleteUser, PostUser, EditUser, GetUsers } from "./api.js"

let addUser = document.querySelector(".addUser")
let box = document.querySelector(".box")
let addDialog = document.querySelector(".addDialog")
let addForm = document.querySelector(".addForm")
let editDialog = document.querySelector(".editDialog")
let editForm = document.querySelector(".editForm")
let search = document.querySelector(".search")

let select = document.querySelector(".select");
let viewAll = document.querySelector(".wiew");
let idx = null;

viewAll.onclick = () => {
  GetUsers(); 
  select.value = "all"; 
}

select.onchange = (e) => {
  const filterValue = e.target.value; 
  if (filterValue === "all") {
    GetUsers();
  } else {
    
    GetUsers().then(() => {
      let rows = document.querySelectorAll(".box tr");
      rows.forEach(row => {
        const status = row.children[2].innerText; 
        if ((filterValue === "true" && status !== "ONLINE") ||
            (filterValue === "false" && status !== "OFFLINE")) {
          row.style.display = "none";
        } else {
          row.style.display = "";
        }
      })
    })
  }
}

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
        employed: editForm["employed"].value,
        status: editForm["select"].value === "true"
    }
    EditUser(obj)
    editForm.reset()
    editDialog.close()
}

search.oninput = (e) => {
   GetUsers(e.target.value.toLowerCase())
}


function ShowUser(data) {
    box.innerHTML = ""
    data.forEach((e) => {
        let tr = document.createElement("tr")
        // Статус badge
        let statusClass = e.status ? "status-online" : "status-offline"
        let statusText = e.status ? "ONLINE" : "OFFLINE"

        tr.innerHTML = `
            <td><img class="img1" src="${e.image}" alt=""> ${e.name}</td>
            <td>${e.Categories}</td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td>${e.employed}</td>
            <td>
                <button class="btnDelete">🗑️</button>
                <button class="btnEdit">🖊️</button>
            </td>
        `

        let btnDelete = tr.querySelector(".btnDelete")
        let btnEdit = tr.querySelector(".btnEdit")

        btnDelete.onclick = () => DeleteUser(e.id)
        btnEdit.onclick = () => {
            idx = e.id
            editDialog.show()
            editForm["image"].value = e.image
            editForm["name"].value = e.name
            editForm["Categories"].value = e.Categories
            editForm["employed"].value = e.employed
            editForm["select"].value = e.status ? "true" : "false"
        }

        box.appendChild(tr)
    });
}

export { ShowUser }