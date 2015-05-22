$(document).ready(function () {
    $( "form" ).submit(function( event ) {
    event.preventDefault();
    })
    var newli = function(n) {
        $('#items' + n + ' ol').append('<li><span></span></li>');
    };
    newli(1);
    newli(2);
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
                newli(1);
                console.log('4 newli');
                rightArrow.click(function() {
                    var content = $(this).parent().text();
                    console.log('8 content:', content);
                    var move = $('#items2 li:last span').text(content);
                    console.log('9 move right:', move);
                    var addX = $('#items2 li:last').append(newXbutton());
                    console.log('10 append x:', addX);
                    newli(2);
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
    $('.box-two').on('keyup', function(event) {
        var item = $('#submit-box2').val();
        console.log("1 item:", item);
        if (event.which === 13) {
            console.log("2 enter key");
            event.preventDefault();
            if (item.length >= 1) {
                console.log("3 true");
                //var rightArrow = $('<i class="fa fa-arrow-right"></i>');
                //var xButton = newXbutton();
                $('#items2 li:last').append(newXbutton());
                newli(2);
                console.log('4 newli');
                $('#submit-box2').val('');
            } else {
                console.log("false");
                alert("Please type in an item!");
            }
        } else {
            $('#items2 li:last span').text(item);
        }
    })
    var empty = function(n) {
        var trash = $('#trash' + n);
        console.log(trash);
        trash.click(function() {
            $('#items' + n).empty();
            $('#items' + n).append('<ol></ol>');
            newli(n);
        });
    }
    empty(1);
    empty(2);
});