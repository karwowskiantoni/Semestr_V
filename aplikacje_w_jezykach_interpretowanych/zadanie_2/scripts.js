"use strict";
let todoList = [];

function updateJsonBin() {
  const req = new XMLHttpRequest();
  req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
      console.log(req.responseText);
    }
  };

  req.open("PUT", "https://api.jsonbin.io/b/616ac7044a82881d6c60fe81", true);
  req.setRequestHeader(
    "secret-key",
    "$2b$10$GVTUftchLDBpl.nbzCgNb.LzddtcFAo/fXMoOvPU295k9v1MYSODO"
  );
  req.setRequestHeader("Content-Type", "application/json");
  req.send(JSON.stringify(todoList));
}

function getListFromApi() {
  const req = new XMLHttpRequest();
  req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
      todoList = JSON.parse(req.responseText);
    }
  };
  req.open(
    "GET",
    "https://api.jsonbin.io/b/616ac7044a82881d6c60fe81/latest",
    true
  );
  req.setRequestHeader(
    "secret-key",
    "$2b$10$GVTUftchLDBpl.nbzCgNb.LzddtcFAo/fXMoOvPU295k9v1MYSODO"
  );
  req.send();
}

function deleteTodo(todo) {
  todoList.splice(todoList.indexOf(todo), 1);
  updateJsonBin();
}

function addTodo() {
  todoList.push({
    title: document.getElementById("inputTitle").value,
    description: document.getElementById("inputDescription").value,
    place: document.getElementById("inputPlace").value,
    dueDate: document.getElementById("inputDueDate").value,
  });
  updateJsonBin();
}

function updateTodoList() {
  document.getElementById("todoListView").innerHTML = "";
  const filterInput = document.getElementById("inputSearch").value;
  const filterFromDate = document.getElementById("inputSearchFromDate").value;
  const filterDueDate = document.getElementById("inputSearchDueDate").value;
  todoList
    .filter((todo) => filterInput === "" || isInToDo(todo, filterInput))
    .filter((todo) => filterFromDate === "" || todo.dueDate >= filterFromDate)
    .filter((todo) => filterDueDate === "" || todo.dueDate <= filterDueDate)
    .forEach(renderTodo);
}

function isInToDo(todo, value) {
  return (
    todo.title.includes(value) ||
    todo.description.includes(value) ||
    todo.place.includes(value)
  );
}

function renderTodo(todo) {
  const row = document.createElement("tr");
  const title = document.createElement("td");
  const description = document.createElement("td");
  const place = document.createElement("td");
  const dueDate = document.createElement("td");
  const button = document.createElement("td");

  title.appendChild(document.createTextNode(todo.title));
  description.appendChild(document.createTextNode(todo.description));
  place.appendChild(document.createTextNode(todo.place));
  dueDate.appendChild(document.createTextNode(todo.dueDate));
  button.appendChild(createDeleteButton(todo));

  row.appendChild(title);
  row.appendChild(description);
  row.appendChild(place);
  row.appendChild(dueDate);
  row.appendChild(button);
  document.getElementById("todoListView").appendChild(row);
}

function createDeleteButton(todo) {
  // <input type="button" className=>delete</input>
  const button = document.createElement("input");
  button.type = "button";
  button.value = "delete";
  button.className = "btn btn-outline-danger";
  button.addEventListener("click", function () {
    deleteTodo(todo);
  });
  return button;
}

getListFromApi();
setInterval(updateTodoList, 1000);
