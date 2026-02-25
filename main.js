import { DeleteUser, PostUser, EditUser,GetUser } from "./api.js";

let openDialog = document.querySelector(".openDialog");
let AddUser = document.querySelector(".AddUser");
let form = document.querySelector(".form");
let box = document.querySelector(".box");
let search= document.querySelector(".search")

let EditDialog = document.querySelector(".EditUser");
let editForm = document.querySelector(".editform");

let idx = null;

openDialog.onclick = () => {
  AddUser.showModal();
};

form.onsubmit = (event) => {
  event.preventDefault();

  let user = {
    name: form["name"].value,
    categories: form["categories"].value,
    price: form["price"].value,
    status: form["select"].value
  };

  PostUser(user);
  AddUser.close();
  form.reset();
};

search.onchange = (e) => {
  const value = e.target.value.toLowerCase();
  GetUser(value)

}

function ShowUsers(data) {
  box.innerHTML = "";

  data.forEach((e, i) => {
    let tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${e.name}</td>
      <td>${e.categories}</td>
      <td>${e.price}</td>
      <td>${e.status == "true" ? "active" : "inactive"}</td>
      <td>
        <button class="btnDelete">🗑️</button>
        <button class="btnEdit">🖊️</button>
      </td>
    `;

    let btnDelete = tr.querySelector(".btnDelete");
    let btnEdit = tr.querySelector(".btnEdit");

    btnDelete.onclick = () => {
      DeleteUser(e.id);
    };

    btnEdit.onclick = () => {
      idx = e.id;
      editForm["name"].value = e.name;
      editForm["categories"].value = e.categories;
      editForm["price"].value = e.price;
      editForm["select"].value = e.status;
      EditDialog.showModal();
    };

    box.appendChild(tr);
  });
}

editForm.onsubmit = (event) => {
  event.preventDefault();

  let updatedUser = {
    id: idx,
    name: editForm["name"].value,
    categories: editForm["categories"].value,
    price: editForm["price"].value,
    status: editForm["select"].value
  };

  EditUser(updatedUser);
  EditDialog.close();
};

export { ShowUsers };