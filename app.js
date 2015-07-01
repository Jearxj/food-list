$(document).ready(function () {
  $( "form" ).submit(function( event ) {
  event.preventDefault();
  })
  
  //transforms data into editor
  var makeEditor = function(data) {
    var mainEditor = $('<div></div>');
    var headerEditor = $('<input id="item-name" type="text" placeholder="Item...">');
    var tagsLabel = $('<i class="fa fa-tags"></i>');
    var plusLabel = $('<button class="fa fa-plus">');
    
    mainEditor.append(headerEditor, tagsLabel, plusLabel);
    headerEditor.on('keyup', oneGiantHandler);
    if (data === undefined) {
      mainEditor.addClass('newHandler');
    } else {
      headerEditor.prop('value', data.header);
    }
    return mainEditor;
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
    var header = display.text();
    var location = getLocation(display);
    var data = {header: header,
               location: location};
    return data;
  };
  
  var editorToData = function(mainEditor) {
    var headerEditor = $(mainEditor.children()[0]);
    var header = headerEditor.val();
    var location = getLocation(mainEditor);
    var data = {header: header,
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
    
    var header = data.header;
    var location = data.location;
    setLocation(display, location);
    display.text(header);
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
    var headerEditor = $(this);
    var mainEditor = headerEditor.parent();
    var data = editorToData(mainEditor);
    if (data.header.length === 0) {
      alert("Please type in an item!");
      return;
    }    

    if (mainEditor.hasClass("shopping-list")) {
      if (mainEditor.hasClass("newHandler")) {
        newItem('shopping-list', oneGiantHandler);
      } 
      var display = dataToDisplay(data, true);
      mainEditor.replaceWith(display);
    }
    
        
    if (mainEditor.hasClass("inventory-list")) {
      if (mainEditor.hasClass("newHandler")) {
        newItem('inventory-list', oneGiantHandler);
      }
      var display = dataToDisplay(data, false);
      mainEditor.replaceWith(display);
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