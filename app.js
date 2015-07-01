$(document).ready(function () {
  $( "form" ).submit(function( event ) {
  event.preventDefault();
  })
  
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
    displayOrEditor.removeClass('shopping-list inventory-list');
    displayOrEditor.addClass(location);
  };
  
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
      display.append(makeArrow());
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

  var makeArrow = function() {
    var rightArrow = $('<i class="fa fa-arrow-right"></i>');
    
    rightArrow.click(function() {
      var oldDisplay = $(this).parent();
      var location = 'inventory-list';
      setLocation(oldDisplay, location);
      var data = displayToData(oldDisplay);
      var newDisplay = dataToDisplay(data, false);
      oldDisplay.replaceWith(newDisplay);
      var item = newDisplay.parent();
      item.detach().prependTo($('#inventory-list'));
    })
    return rightArrow;
  };
});