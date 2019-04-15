const btnSave = document.getElementById("btnSave");
const toDoItem = document.getElementById("toDoItem");

getItems();

btnSave.onclick = function() {
  const toDoText = toDoItem.value;
  storeItem(toDoText);
}

function storeItem(item){
  let items = getItems();
  if(items != undefined && items != ""){
    items = `${items} , ${item};`
  } else {
    items = item;
  }
  Lockr.set('Items', items);
}

function getItems(){
  const todos = Lockr.get('Items');
  console.log(todos);
  return todos;
}
