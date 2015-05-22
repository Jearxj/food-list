$(document).ready(function () {
    $( "form" ).submit(function( event ) {
    event.preventDefault();
    })
    var newLi = function() {
        $('#items1 ol').append('<li><span></span></li>');
    };
    var newDt = function() {
        $('#items2 dl').append('<dt><span></span></dt>');
    };
    newLi();
    newDt();
    
    var newXbutton = function() {
        var x = $('<i class="fa fa-times"></i>');
        x.click(function() {          
            $(this).parent().remove();
            console.log('6 remove');
        })
        return x;
    };
    
    $('.box-one').on('keyup', function(event) {
        var item = $('#submit-box1').val();
        console.log("1 item:", item);
        if (event.which === 13) {
            console.log("2 enter key");
            event.preventDefault();
            if (item.length >= 1) {
                console.log("3 true");
                var rightArrow = $('<i class="fa fa-arrow-right"></i>');
                //var xButton = newXbutton();
                $('#items1 li:last').append(rightArrow, newXbutton());
                newLi();
                console.log('4 newli');
                rightArrow.click(function() {
                    var content = $(this).parent().text();
                    console.log('8 content:', content);
                    var move = $('#items2 dt:last span').text(content);
                    console.log('9 move right:', move);
                    var addX = $('#items2 dt:last').append(newXbutton());
                    console.log('10 append x:', addX);
                    newDt();
                })
                $('#submit-box1').val('');
            } else {
                console.log("false");
                alert("Please type in an item!");
            }
        } else {
            $('#items1 li:last span').text(item);
        }
    })
    
    $('#items1').on('click', 'li span', function() {
        $(this).toggleClass('crossout');
    })
    
    $('#submit-box2').on('keyup', function(event) {
        var item = $('#submit-box2').val();
        console.log("1 item:", item);
        if (event.which === 13) {
            console.log("2 enter key");
            event.preventDefault();
            if (item.length === 0) {
                console.log("false");
                alert("Please type in an item!");
                return;
            }
            $('#items2 dt:last').append(newXbutton());
            newDt();
            $('#submit-box2').val(''); 
        } else {
            $('#items2 dt:last span').text(item);
        }    
    })
    
    $('#add-category').on('keyup', function(event) {
        var categoryItem = $('#add-category').val();
        if (event.which === 13) {
            console.log("2 enter key");
            event.preventDefault();
            if (categoryItem.length === 0) {
                console.log("false");
                alert("Please type in a category!");
                return;
            }         
            $('#items2 dt:last').append(newXbutton());
            newDt();
            $('#add-category').val('');
        } else {
            $('#items2 dt:last span').text(categoryItem);
        }
    })
    
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
});