import { DeleteUser } from "./api.js"

let btnOpen = document.querySelector(".btnOpen")
let btnClose = document.querySelector(".btnClose")
let box = document.querySelector(".box")
let addDialog = document.querySelector(".addDialog")



btnOpen.onclick = () => {
    addDialog.show()
}

function ShowUsers(data) {
    box.innerHTML = ""
    data.forEach(el => {
        let tr = document.createElement("tr")
        let tdName = document.createElement("td")
        let tdage = document.createElement("td")
        let tdJob = document.createElement("td")
        let tdActions = document.createElement("td")
        let btndelete = document.createElement("button")
        let btnEdit = document.createElement("button")
        tdName.innerHTML = el.name
        tdage.innerHTML = el.age
        tdJob.innerHTML = el.job
        btndelete.innerHTML = "delete"
        btnEdit.innerHTML = "edit"
        btndelete.onclick = ()=>{
            DeleteUser(el.id)
        }
        tdActions.append(btndelete, btnEdit)
        tr.append(tdName, tdage, tdJob,tdActions)
        box.append(tr)
    });
}



export { ShowUsers }