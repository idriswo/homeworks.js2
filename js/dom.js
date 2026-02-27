import { checkData, GetData } from "./api.js";

let box = document.querySelector(".box")
let statusFilter = document.querySelector(".statusFilter")
let search = document.querySelector(".search")


statusFilter.onchange = async (event) => {
    let value = event.target.value
    let data = await GetData()
    let filterData = value ? data.filter((e) => e.status.toString() == value) : data;
    ShowData(filterData)
}

search.oniput = async (event) => {
    let value = event.target.value
    let data = await GetData()
    let filterData = value ? data.filter((e) => e.name.toLoweCase().includes(value.trim().toLoweCase()) == value) : data;
    ShowData(filterData)
}


export function ShowData(data) {
    box.innerHTML = ""
    data.forEach((e, i) => {
        let tr = document.createElement("tr")
        tr.innerHTML = `
                <td>${e.id}</td>
                <td>${e.name}</td>
                <td>${e.email}</td>
                <td>${e.status}</td>
                <td>
                    <button class="btndelete">edit</button>
                    <button class="btnEdit">delete</button>
                    <input type="checkbox" class="check">
                </td>
        `
        let check = tr.querySelector(".check")
        check.checked = e.status
        check.onclick = () => {
            let checkdata = { ...e, status: !e.status }
            checkData(checkdata)
        }
        box.appendChild(tr)
    });
}