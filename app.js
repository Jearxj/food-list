$(document).ready(function () {
  $( "form" ).submit(function( event ) {
  event.preventDefault();
  })

  var addTagEditor = function() {
    var tagEditor = makeTagEditor();
    tagEditor.insertBefore($(this));
    tagEditor.focus();
  };
  
  var makeTagEditor = function(tagData) {
    var tagEditor = $('<input class="tag-name" type="text" placeholder="Tag...">');
    
    if (tagData !== undefined) {
      tagEditor.val(tagData);
    }
    
    tagEditor.on('keyup', oneGiantHandler);
    return tagEditor;
  }
    
  //data to editor
  var makeMainEditor = function(data) {
    var mainEditor = $('<div class="main-editor"></div>');
    var headerEditor = $('<input class="item-name" type="text" placeholder="Item...">');
    var tagsLabel = $('<i class="fa fa-tags"></i>');
    var plusTagButton = $('<button class="fa fa-plus">');
    
    plusTagButton.on('click', addTagEditor);
    
    //can we move this out?
    mainEditor.append(headerEditor, tagsLabel);
    headerEditor.on('keyup', oneGiantHandler);
    if (data === undefined) {
      mainEditor.addClass('newHandler');          
    } else {
      headerEditor.prop('value', data.header);
      for (var i = 0; i < data.tags.length; i++) {
        var tagEditor = makeTagEditor(data.tags[i]);
        mainEditor.append(tagEditor);
      }
    }
    mainEditor.append(plusTagButton);
    return mainEditor;
  };
  
  //save all editors then make a new editor
  var saveThenMakeEditor = function(data) {
    saveAllEditors();
    makeMainEditor(data);
  };
  
  $('.search-field').focusin(function() {
    saveAllEditors();
  })
  
  $('.search-field').on('keyup', function() {
    var $this = $(this);
    //field refers to any of the fields in the item, including headers and tags
    var prefixMatchField = function(query, field) {
      console.log("prefixMatchField:", prefixMatchField);
      if (query.length > field.length) {
        return false;
      }
      for (var i = 0; i < query.length; i++) {
        if (query[i] !== field[i]) {
            return false;
        }
      }
      return true;
    }
    
    var prefixMatchItem = function(query, item) {
      var fields = item.find('.searchable');
      for (var i = 0; i < fields.length; i++) {
        var textField = $(fields[i]).text();
        if (prefixMatchField(query, textField)) { 
          return true;
        }
      }
      return false;
    } 
    //hide searched items if query does not match
    var hideOrShow = function(query, items) {
      for (var i = 0; i < items.length; i++) {
        var item = $(items[i]);
        if (prefixMatchItem(query, item)) {
          item.show();
        } else {
          item.hide();
        }
      }
    }
    
    var query = $this.val();
    var items = $this.parent().find('li');
    
    hideOrShow(query, items);
    
  });
  
  var saveAllEditors = function() {
    
    var mainEditors = $('.main-editor');
    
    mainEditors.each(function(i, mainEditor) {
      mainEditor = $(mainEditor);
      //empty check
      if (mainEditor.children('.item-name').val() === '') {
        mainEditor.parent().remove();
        return;
      }
      //editor to display
      var data = editorToData(mainEditor);
      //the other class is inventory-list, which would set moveArrow to false
      var moveArrow = mainEditor.hasClass("shopping-list"); 

      var display = dataToDisplay(data, moveArrow);
      mainEditor.replaceWith(display); 
    });
  };
  
  var editorFocus = function(editor) {
    editor.children('.item-name').focus();
  };
  
  $('.newShoppingItemButton').on('click', function() {
    saveAllEditors();
    newItem('shopping-list');
  });
  
    $('.newInventoryItemButton').on('click', function() {
    saveAllEditors();
    newItem('inventory-list');
  });
  
  var newItem = function(location) {
      var item = $('<li></li>');  
      var editor = makeMainEditor();
      setLocation(editor, location);
      item.append(editor);
      $('#' + location).append(item);
      editorFocus(editor);
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
  
  var displayToData = function(wholeDisplay) {
    var tagDisplays = wholeDisplay.children('.tag-name');
    var header = $(wholeDisplay.children()[0]).text();
    var location = getLocation(wholeDisplay);
    var tags = [];
      for (var i = 0; i < tagDisplays.length; i++) {
      tags.push($(tagDisplays[i]).text());
    }
    var data = {
      tags: tags,
      header: header,
      location: location
    };
    return data;
  };
  
  var editorToData = function(mainEditor) {
    var tagEditors = mainEditor.children('.tag-name');
    var headerEditor = $(mainEditor.children()[0]);
    var header = headerEditor.val();
    var location = getLocation(mainEditor);
    var tags = [];
    for (var i = 0; i < tagEditors.length; i++) {
      tags.push($(tagEditors[i]).val());
    }
    var data = {
      tags: tags,
      header: header,
      location: location
    };
    return data;
  };
  
  var startEditing = function() {
    saveAllEditors();
    var data = displayToData($(this));
    var editor = makeMainEditor(data);
    var location = getLocation($(this));
    setLocation(editor, location);
    $(this).replaceWith(editor);
    editorFocus(editor);
  } ;
  
  var dataToDisplay = function(data, move) { 
    var wholeDisplay = $('<div></div>');
    var headerDisplay = $('<h3 class="searchable"></h3>');
    var tagsLabel = $('<i class="fa fa-tags"></i>');
    
    wholeDisplay.append(headerDisplay);
    if (data.tags.length !== 0) {
        wholeDisplay.append(tagsLabel);
    }
    for (var i = 0; i < data.tags.length; i++) {
      var tagDisplay = $('<span class="tag-name searchable"></span>');
      tagDisplay.text(data.tags[i]);
      wholeDisplay.append(tagDisplay);
      if (i !== data.tags.length - 1) {
        wholeDisplay.append(', ');
      }
    }
    
    wholeDisplay.on('click', startEditing);
    var header = data.header;
    var location = data.location;
    setLocation(wholeDisplay, location);
    headerDisplay.text(header);
    if (move) {
      headerDisplay.append(makeArrow());
    }
    headerDisplay.append(newXbutton());
    return wholeDisplay;
  };
  
  var oneGiantHandler = function(event) {
    if (event.which !== 13) {
      return;
    }
    
    console.log('handler working');
    
    event.preventDefault();
    var headerEditor = $(this);
    var mainEditor = headerEditor.parent();   
    
    saveAllEditors();
    
    if (mainEditor.hasClass("newHandler")) {
      var isShoppingList = mainEditor.hasClass('shopping-list');
      var whichList = isShoppingList ? 'shopping-list': 'inventory-list';
      newItem(whichList);
    }
  };

  var newXbutton = function() {
    var x = $('<i class="fa fa-times"></i>');
    
    x.click(function() {          
      $(this).parent().parent().parent().remove();
      console.log('6 remove');
    })
    return x;
  };

  var makeArrow = function() {
    var rightArrow = $('<i class="fa fa-arrow-right"></i>');
    
    rightArrow.click(function() {
      var oldDisplay = $(this).parent().parent();
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