$(document).ready(function () {
  $( "form" ).submit(function( event ) {
  event.preventDefault();
  })
  var newLi = function() {
    $('#items1 ol').append('<li><span></span></li>');
  };
  
  //makes a new editor
  var makeEditor = function(data) {
    var editor = $('<input id="item-name" type="text" placeholder="Item...">');
    editor.prop('value', data);
    return editor;
  };
  
  
  var newItem = function(whichList, whichNewHandler) {
    var item = $('<li></li>');  
    var editor = makeEditor();
    editor.on('keyup', whichNewHandler);
    item.append(editor);
    $(whichList).append(item);
  };
  
  var staticName = function(data, move, whichExistingHandler) { 
    var display = $('<h3></h3>');
    
    display.text(data);
    //re-adds editor
    display.on('click', function() {
      var data = $(this).text();
      var editor = makeEditor(data);
      editor.on('keyup', whichExistingHandler);
      $(this).replaceWith(editor);
      editor.focus();
    });

    if (move) {
      display.append(moveItem());
    }
    display.append(newXbutton());
    return display;
  };
  
  var shoppingExistingHandler = function(event) {
    if (event.which !== 13) {
      return;
    }
    
    console.log('shopping existing handler working');
    
    event.preventDefault();
    var data = $(this).val();
    if (data.length === 0) {
      alert("Please type in an item!");
      return;
    }
    
    var item_name = staticName(data, true, shoppingExistingHandler);
    $(this).replaceWith(item_name);
  };

  var inventoryExistingHandler = function(event) {
    if (event.which !== 13) {
      return;
    }
    
    console.log('existing handler working');
    event.preventDefault();
    var data = $(this).val();
    if (data.length === 0) {
      alert("Please type in an item!");
      return;
    }

    var item_name = staticName(data, false, inventoryExistingHandler);
    $(this).replaceWith(item_name);
  };
  
  var newShoppingHandler = function(event) {
    if (event.which !== 13) {
      return;
    }
    console.log('new handler working');
    event.preventDefault();
    var data = $(this).val();
    if (data.length === 0) {
      alert("Please type in an item!");
      return;
    }

    //shopping-list   
    newItem('#shopping-items', newShoppingHandler);
    var item_name = staticName(data, true, shoppingExistingHandler); 
    $(this).replaceWith(item_name);
  };
  
  var newInventoryHandler = function(event) {
    if (event.which !== 13) {
      return;
    }
    event.preventDefault();
    var data = $(this).val();
    if (data.length === 0) {
      alert("Please type in an item!");
      return;
    }
    
    //food-inventory
    var item_name = staticName(data, false, inventoryExistingHandler);
    $(this).replaceWith(item_name);
    newItem('#inventory-items', newInventoryHandler);
  };
    
  newItem('#shopping-items', newShoppingHandler);
  newItem('#inventory-items', newInventoryHandler);

  var newXbutton = function() {
    var x = $('<i class="fa fa-times"></i>');
    
    x.click(function() {          
      $(this).parent().parent().remove();
      console.log('6 remove');
    })
    return x;
  };

  var moveItem = function() {
    var rightArrow = $('<i class="fa fa-arrow-right"></i>');
    
    rightArrow.click(function() {
        var content = $(this).parent().text();
        console.log('8 content:', content);
        var move = $('#inventory-items li:last span').text(content);
        console.log('9 move right:', move);
        var addX = $('#inventory-items li:last').append(newXbutton());
        console.log('10 append x:', addX);
        newLi();
      })
    return rightArrow;
  };

  /*
  $('#add-category').on('keyup', function(event) {
      var newCategory = $(this).val();
      //var categoryItem = $('#add-category').val();
      if (event.which === 13) {
          console.log("2 enter key");
          event.preventDefault();
          if (newCategory.length === 0) {
              console.log("false");
              alert("Please type in a category!");
              return;
          }
          var newOption = $('<option><span></span></option>');
          newOption.attr('value', newCategory);
          newOption.text(newCategory);
          $('#category').append(newOption);
          //$('#category span').text(newCategory);
          $('#items2 dt:last').append(newXbutton());
          newDt();
          $('#add-category').val('');
      } else {
          $('#items2 dt:last span').text(newCategory);
      }
  })
  */
  /*
  var emptyShoppingList = function() {
      var trashShoppingList = $('#trash1');
      console.log(trashShoppingList);
      trashShoppingList.click(function() {
          $('#items1 ol').empty();
          newLi();
      });
  }
  var emptyInventory = function() {
      var trashInventory = $('#trash2');
      console.log(trashInventory);
      trashInventory.click(function() {
          $('#items2 dl').empty();
          newDt();
      });
  }
  emptyShoppingList();
  emptyInventory();
  */
});