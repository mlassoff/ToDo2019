const btnSave = document.getElementById("btnSave");
const toDoItem = document.getElementById("toDoItem");
const itemsDisplay = document.getElementById("itemsDisplay");

displayItems(getItems());

btnSave.onclick = function() {
  const toDoText = toDoItem.value;
  storeItem(toDoText);
}

function storeItem(item){
  let items = getItems();
  if(items != undefined && items != ""){
    items = `${items} , ${item}`;
  } else {
    items = item;
  }
  saveToDos(items);
}

function saveToDos(items){
  Lockr.set('Items', items);
  displayItems(items);
  clearEntry();
}

function clearEntry()
{
  toDoItem.value = "";
}

function getItems(){
  const todos = Lockr.get('Items');
  return todos;
}

function displayItems(items){
  if(items != undefined && items != ""){
    const itemArray = items.split(',');
    let out = '<ul class="list">';
    for(var x= 0; x < itemArray.length; x++){
      out += ' <li class="list-item list-item--longdivider"><div class="list-item__center list-item--longdivider__center">';
      out += "" + itemArray[x] + "</div>";
      out += '<div class="list-item__right" onclick="deleteItem(' + x + ');"><i class="zmdi zmdi-delete"></i></div></li>';
    }
    out += "</ul>"
    itemsDisplay.innerHTML = out;
  }
}

function deleteItem(itemToDelete){
  let items = getItems();
  let itemArray = items.split(',');
  let newItems = new Array();
  for(var x = 0; x < itemArray.length; x++){
    if(x != itemToDelete){
      newItems.push(itemArray[x]);
    }
  }
  displayItems(newItems.join());
  saveToDos(newItems.join());
}
