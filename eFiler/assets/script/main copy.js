$(document).ready(function(){

    var folderName = './docs/';
    var fileName = '';
    
    loadDroptown('languages', 'languages');
    loadDroptown('states','states');
    
    ///Gnerate button function
    $("#generate").click(function(){
        alert(fileName);

        $.get(fileName, function(data) {
            //process text file line by line
            $('#loadfile').html(data);
         });

      });

      $("#states").change (function(){   
        $("#districts").find("option").remove(); 
        $("#taluks").find("option").remove(); 
        $("#officers").find("option").remove(); 
        loadDroptown($("#states").val() +  'districts','districts');
      });

      $("#districts").change (function(){   
        $("#taluks").find("option").remove(); 
        $("#officers").find("option").remove(); 
        loadDroptown($("#states").val() + $("#districts").val() + 'taluks','taluks');
      });

      $("#taluks").change (function(){   
        $('#villages').find("option").remove(); 
        loadDroptown($("#states").val() + $("#districts").val() +  $("#taluks").val() + 'villages','villages');
      });

      $("#villages").change (function(){   
        $('#officers').find("option").remove(); 
        loadDroptown($("#states").val() + $("#districts").val() +  $("#taluks").val()  +  $("#villages").val() +  'officers','officers');
      });
  
    function loadDroptown(choice, targetinput){ 
        fileName = 'assets/repositories/' + choice + '.json';    
        $('#' + targetinput).find("option").remove(); 
        $('#' + targetinput).append("<option id='select'>--Select--</optoin>"); 
        $.getJSON( fileName, function( data ) {
            var items = [];
            $.each( data, function( key, val ) {
                $('#' + targetinput ).append("<option value='" + val['key'] + "'>" + val['name'] + "</optoin>");
            });
        });

        /*switch(choice){
            case 'languages':{ 
                $.getJSON( fileName, function( data ) {
                    alert(data);
                    var items = [];
                    $('#states').append("<option id='select'>--Select--</optoin>");
                    $.each( data, function( key, val ) {
                        $('#languages').append("<option id='" + val['key'] + "'>" + val['name'] + "</optoin>");
                    });
                });

                break;
            }
            case 'States':{ 
                $.getJSON( fileName, function( data ) {
                    alert(data);
                    var items = [];
                    $('#states').append("<option id='select'>--Select--</optoin>");
                    $.each( data, function( key, val ) {
                        $('#states').append("<option id='" + val['key'] + "'>" + val['name'] + "</optoin>");
                    });
                });

                break;
            }
        }*/
    }
});