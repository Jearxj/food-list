$(document).ready(function () {
  $( "form" ).submit(function( event ) {
  event.preventDefault();
  })
  //Fix this
  var newLi = function() {
    $('#items1 ol').append('<li><span></span></li>');
  };
  
  //transforms data into editor
  var makeEditor = function(data) {
    var editor = $('<input id="item-name" type="text" placeholder="Item...">');
    editor.on('keyup', oneGiantHandler);
    if (data === undefined) {
      editor.addClass('newHandler');
    } else {
      editor.prop('value', data.name);
    }
    return editor;
  };
  
  var newItem = function(location) {
    var item = $('<li></li>');  
    var editor = makeEditor();
    setLocation(editor, location);
    item.append(editor);
    $('#' + location).append(item);
  };
  
  var getLocation = function(displayOrEditor) {
    var location;
    if (displayOrEditor.hasClass('shopping-list')) {
      location = 'shopping-list'; 
    } else {
      location = 'inventory-list';
    }
    return location;
  };
  
  var setLocation = function(displayOrEditor, location) {
    displayOrEditor.addClass(location);
  }
  
  var displayToData = function(display) {
    var name = display.text();
    var location = getLocation(display);
    var data = {name: name,
               location: location};
    return data;
  };
  
  var editorToData = function(editor) {
    var name = editor.val();
    var location = getLocation(editor);
    var data = {name: name,
               location: location};
    return data;
  };
  
  var dataToDisplay = function(data, move) { 
    var display = $('<h3></h3>');
    
    //re-adds editor
    display.on('click', function() {
      var data = displayToData($(this));
      var editor = makeEditor(data);
      var location = getLocation($(this));
      setLocation(editor, location);
      $(this).replaceWith(editor);
      editor.focus();
    });
    
    var name = data.name;
    var location = data.location;
    setLocation(display, location);
    display.text(name);
    if (move) {
      display.append(moveItem());
    }
    display.append(newXbutton());
    return display;
  };
  
  var oneGiantHandler = function(event) {
    if (event.which !== 13) {
      return;
    }
    
    console.log('handler working');
    
    event.preventDefault();
    var editor = $(this);
    var data = editorToData(editor);
    if (data.name.length === 0) {
      alert("Please type in an item!");
      return;
    }    
    console.log('editor working:', editor);
    if (editor.hasClass("shopping-list")) {
      if (editor.hasClass("newHandler")) {
        newItem('shopping-list', oneGiantHandler);
      } 
      var display = dataToDisplay(data, true);
      editor.replaceWith(display);
    }
    
        
    if (editor.hasClass("inventory-list")) {
      if (editor.hasClass("newHandler")) {
        newItem('inventory-list', oneGiantHandler);
      }
      var display = dataToDisplay(data, false);
      editor.replaceWith(display);
    }
  };
  /*
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
    
    //inventory-list
    var item_name = staticName(data, false, inventoryExistingHandler);
    $(this).replaceWith(item_name);
    newItem('#inventory-items', newInventoryHandler);
  };
  */  
  newItem('shopping-list');
  newItem('inventory-list');

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
        var data = displayToData($(this).parent());
        console.log('8 content:', data);
        var move = $('#inventory-list li:last span').text(data);
        console.log('9 move right:', move);
        var addX = $('#inventory-list li:last').append(newXbutton());
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