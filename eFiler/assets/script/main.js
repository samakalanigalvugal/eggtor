$(document).ready(function(){
    var folderName = './docs/';
    var fileName = '';
    var localerrmessage = '';
    var statesrepository,districtrepository,talukrepository,officerepository,grievancerepository;
    var currentpageurl = window.location.href;
    var CONSTINDEX = 'index';
    var CONSTGRIEVANCE = 'grienvancegenerator';
    var CONSTARCHIVES = 'archives';
    var CONSTGOVERNMENTCONTACTS = 'governmentcontactlist';
    var CONSTCONTACTUS = 'contactus';
    var CONSTGOVERNMENTDECISIONS= 'governmentdecisions';
    var CONSTJUDICIALDECISIONS = 'judicialdecisions';
    
    if(currentpageurl.indexOf(CONSTINDEX) > 0 ){
        processnav(CONSTINDEX);
    }
    else if(currentpageurl.indexOf(CONSTGOVERNMENTCONTACTS) > 0 ){
        processnav(CONSTGOVERNMENTCONTACTS);
    }
    else if(currentpageurl.indexOf(CONSTCONTACTUS) > 0 ){
        processnav(CONSTCONTACTUS);
    }
    else if(currentpageurl.indexOf(CONSTARCHIVES) > 0 ){
        processnav(CONSTARCHIVES);
        folderName = 'assets/archives/';
        fileName= 'archivelist.json';   
        $.getJSON( folderName + fileName, function( data ) {
            $.each( data, function( key, val ) {
                /*$('.archivelist').append('<li class="w3-bar">' + 
                                        '<a href="' + folderName + 'docs/' + val['filename'] + val['filetype'] + '"  target="_blank">' +
                                        '<img src="' + folderName + 'docs/' + val['imagenameandtype'] + '" class="w3-bar-item w3-circle w3-hide-small" style="width:85px">' +
                                        '<div class="w3-bar-item"><span class="w3-large">' + val['filetitle'] + ' - by ' + val['fileauthor'] + '</span><br>' +
                                        '<span>' + val['fileclassified'] + '</span> </div></a></li>');*/


               /* $('.archivelist').append('<div class="column">' + 
                                            '<div class="card">' +
                                            '<a href="' + folderName + 'docs/' + val['filename'] + val['filetype'] + '"  target="_blank">' +
                                            '<h3>' + val['filetitle'] + '</h3>' +
                                            '<p> - by ' + val['fileauthor'] + '</p>' +
                                            '<p>' + val['fileclassified'] + '</p>' +
                                            '</div>'  +
                                            '</div>');*/
            });
        });
    }
    else if(currentpageurl.indexOf(CONSTGRIEVANCE) > 0 ){
        processnav(CONSTGRIEVANCE);
        showhideerror(2); //1 - show, 2 - hide.
        loadstatesrepository();
        loadDroptown('languages', 'languages');

        function validate(ctrl, returnvalue){
            if(ctrl.attr('req') && (ctrl.val() == '' || ctrl.val() == '--Select--' || ctrl.val() == 'Information Not Found'))
            {
                ctrl.addClass('redborder');
                if(localerrmessage.length > 0)
                {
                    localerrmessage = localerrmessage + '</br>'
                }
                localerrmessage = localerrmessage + ctrl.attr('errmsg');
            }
            else{
                ctrl.removeClass('redborder');
                if(ctrl.prop('tagName') == 'SELECT')
                {
                    if(returnvalue == 'id')
                    {
                        return $(ctrl).val();
                    }
                    else{
                        return $(ctrl).find( "option:selected" ).text();
                    }
                }
                else{
                    if(returnvalue == 'id')
                    {
                        return $(ctrl).attr('id');
                    }
                    else{
                        return ctrl.val();
                    }
                }
            }
        }
        
        ///Gnerate button function
        function generatehtml(bodycontent){
            /*var newhtml = '<!DOCTYPE html> <html><body style="font-family:Verdana;">';
            newhtml = newhtml + '<div class="main"><table><tr class="tophead"><th colspan="3">Regarding data</th> </tr>';  
            newhtml = newhtml + '<tr><td colspan="3"><div class="bodytitle  paddingtop1 fromaddress">From </div></td>';  
            newhtml = newhtml + '<tr><td colspan="3"><div class="bodytitlecontent fromaddresscontent"> adsfdsfa</div></td></tr>';  
            newhtml = newhtml + '<tr><td colspan="3"><div class="bodytitle toaddress">To </div></td></tr>';  
            newhtml = newhtml + '<tr><td colspan="3"><div class="bodytitlecontent toaddresscontent"> adsfdsfa</div></td></tr>';  
            newhtml = newhtml + '<tr><td colspan="3"><div class="bodytitle  paddingtop1 sirmadam"> Sir/Madam,</div></td></tr>';  
            newhtml = newhtml + '<tr><td colspan="3"><div class="bodytitle  paddingtop1 subject">Subject : </div></td></tr>';  
            newhtml = newhtml + '<tr><td colspan="3"><div class="bodytitlecontent subjectContent">adsfdsfa</div></td></tr>'; 
            newhtml = newhtml + '<tr><td colspan="3"><div class="bodytitlecontent mainContent"> ' + bodycontent + '</div></td></tr>';  
            newhtml = newhtml + '<tr><td colspan="3"><div class="bodytitlecontent subjectContent">adsfdsfa</div></td></tr>'; 
            newhtml = newhtml + '<tr><td colspan="3"><div class="bodytitlecontent mainContent"> ' + bodycontent + '</div></td></tr>'; 
            newhtml = newhtml + '<tr><td ><div class="bodytitle  paddingtop1 senderplace">Place : </div></td>'; 
            newhtml = newhtml + '</table></div></body></html>';*/



            localerrmessage = '';
            $('.errormessage').html(localerrmessage);
            showhideerror(2); //1 - show, 2 - hide.
            var fileLanguageid = validate($("#languages"), 'id');
            var fileLanguage = validate($("#languages"));
            var filername = validate($("#filername"));
            var streetnoname = validate($("#streetnoname"));
            var state = validate($("#states"));
            var district = validate($("#districts"));
            var taluk = validate($("#taluks"));
            var village = validate($("#villages"));
            var office = validate($("#officers"));
            var grievance = validate($("#grievances"));


            var newhtml = '<!DOCTYPE html> <html><body style="font-family:Verdana;">';
            newhtml = newhtml + '<div class="main"><h1>grievance +</h1>';  
            newhtml = newhtml + '<div class="bodytitle  paddingtop1 fromaddress">From </div>';  
            newhtml = newhtml + '<div class="bodytitlecontent fromaddresscontent">' + streetnoname +'</div>';  
            newhtml = newhtml + '<div class="bodytitle toaddress">To </div>';  
            newhtml = newhtml + '<div class="bodytitlecontent toaddresscontent">' + office + '<br/>' +  village  + ',' +   taluk  + '<br/>' +   district  + ',' +  state +' </div>';  
            newhtml = newhtml + '<div class="bodytitle  paddingtop1 sirmadam"> Sir/Madam,</div>';  
            newhtml = newhtml + '<div class="bodytitle  paddingtop1 subject">Subject : </div>';  
            newhtml = newhtml + '<div class="bodytitlecontent subjectContent">' + grievance +'</div>'; 
            newhtml = newhtml + '<div class="bodytitlecontent mainContent"> ' + bodycontent + '</div>';
            newhtml = newhtml + '<td ><div class="bodytitle  paddingtop1 senderplace">Place : </div>'; 
            newhtml = newhtml + '</div></body></html>';


            return newhtml;
        }
        $("#generate").click(function(){

            var doc = new jsPDF();
            fileName = 'assets/templates/en/NoWater.html'; 
            
            var specialElementHandlers = {
                '#editor': function (element, renderer) {
                    return true;
                }
            };
            
            $.get(fileName, function( data ) {
                content = generatehtml(data);
                doc.fromHTML(content, 15, 15, {
                    'width': 170,
                        'elementHandlers': specialElementHandlers
                });
                doc.save('sample-file.pdf');
            });
            
            if(localerrmessage.length > 0)
            {
                $('.errormessage').html(localerrmessage);
                showhideerror(1); //1 - show, 2 - hide.
                return;
            }

            fileName = 'assets/templates/' + fileLanguageid +'/' + grievance +  '.txt'; 

            /*$.get(fileName, function(data) {
                //process text file line by line

                

            /*var printWindow = window.open('', '', 'height=400,width=800');
                printWindow.document.write('<html><head><title>DIV Contents</title>');
                printWindow.document.write('</head><body >');
                printWindow.document.write('asdfsadf');
                printWindow.document.write('</body></html>');
                //printWindow.document.close();
                //printWindow.print();


            // $('#loadfile').html(printWindow);
                });*/
        });

        $("#states").change (function(){   
            $("#districts").find("option").remove(); 
            $("#taluks").find("option").remove(); 
            $("#villages").find("option").remove(); 
            $("#officers").find("option").remove(); 
            $('#grievances').find("option").remove(); 
            districtrepository = statesrepository.filter(obj=> obj.id == $("#states").val())[0]['districts'];
            loadDroptownFromRepository('','districts', districtrepository);
            //loadDroptown($("#states").val() +  'districts','districts');
        });

        $("#districts").change (function(){   
            $("#taluks").find("option").remove(); 
            $("#villages").find("option").remove(); 
            $("#officers").find("option").remove(); 
            $('#grievances').find("option").remove(); 
            talukrepository = districtrepository.filter(obj=> obj.id == $("#districts").val())[0]['taluks'];;
            loadDroptownFromRepository('','taluks', talukrepository);

            //loadDroptown($("#states").val() + $("#districts").val() + 'taluks','taluks');
        });

        $("#taluks").change (function(){ 
            $("#villages").find("option").remove();   
            $("#officers").find("option").remove(); 
            $('#grievances').find("option").remove(); 
            villagerepository = talukrepository.filter(obj=> obj.id == $("#taluks").val())[0]['villages'];
            loadDroptownFromRepository('','villages', villagerepository);

            //loadDroptownFromRepository('states','states', srepository);
            //loadDroptown($("#states").val() + $("#districts").val() +  $("#taluks").val() + 'villages','villages');
        });

        $("#villages").change (function(){  
            $("#officers").find("option").remove();  
            $('#grievances').find("option").remove(); 
            officerepository = villagerepository.filter(obj=> obj.id == $("#villages").val())[0]['offices'];
            loadDroptownFromRepository('','officers', officerepository);
            //loadDroptown($("#states").val() + $("#districts").val() +  $("#taluks").val()  +  $("#villages").val() +  'officers','officers');
        });

        $("#officers").change (function(){  
            $('#grievances').find("option").remove(); 
            grievancerepository = officerepository.filter(obj=> obj.id == $("#officers").val())[0]['grievance'];
            loadDroptownFromRepository('','grievances', grievancerepository);
        });
    
        function showhideerror(showhide) //1 - show, 2 - hide.
        {
            if(showhide == 1)
            {
                $('.errormessage').show();
            }
            else
            {
                $('.errormessage').hide();
            }

        }

        function loadstatesrepository(){ 
            $("#states").find("option").remove();  
            fileName = 'assets/repositories/repository.json?ver=2';   
            $.getJSON( fileName, function( data ) {
                statesrepository = data;
                loadDroptownFromRepository('states','states', statesrepository);
            });
        }

        function loadDroptownFromRepository(choice, targetinput, inputdata)
        {
            $('#' + targetinput).find("option").remove(); 
            $('#' + targetinput).append("<option id='select'>--Select--</optoin>"); 
            if(inputdata === undefined || inputdata == '')
            {
                $('#' + targetinput).append("<option id='select'> Information Not Found </optoin>"); 
            }

            $.each(inputdata, function( key, val ) {
                $('#' + targetinput ).append("<option value='" + val['id'] + "'>" + val['name'] + "</optoin>");
            });
        }
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
        }
    }
    else if(currentpageurl.indexOf(CONSTGOVERNMENTDECISIONS) > 0 ){
        processnav(CONSTGOVERNMENTDECISIONS);
    }
    else if(currentpageurl.indexOf(CONSTJUDICIALDECISIONS) > 0 ){
        processnav(CONSTJUDICIALDECISIONS);
    }

    function processnav(currentpage){
        
        //Nav Section
        $('.menu').append('<div class="menuitem index"><a href="index.html" id="">Home</a></div>' +
            '<div class="menuitem grienvancegenerator"><a href="grienvancegenerator.html" id="">Grienvance Generator</a></div>' +
            '<div class="menuitem archives"><a href="archives.html" id="">Archives</a></div>' + 
            '<div class="menuitem governmentcontactlist "><a href="governmentcontactlist.html" id="">Government Contacts</a></div>' + 
            '<div class="menuitem governmentdecisions "><a href="governmentdecisions.html" id="">Government Decisions</a></div>' + 
            '<div class="menuitem judicialdecisions "><a href="judicialdecisions.html" id="">Judicial Decisions</a></div>' + 
            '<div class="menuitem contactus"><a href="contactus.html" id="">Contact Us</a></div>'
            );
        $('.menuitem').removeClass('selected');
        $('.' + currentpage).remove('a');
        $('.' + currentpage).addClass('selected');
    }

    //footer section
    $('.footer').append(
        '<div class="w3-xlarge w3-section">' +
        '<i class="fa fa-facebook-official w3-hover-opacity"></i>' +
        '<i class="fa fa-instagram w3-hover-opacity"></i>' +
        '<i class="fa fa-snapchat w3-hover-opacity"></i>' +
        '<i class="fa fa-pinterest-p w3-hover-opacity"></i>' +
        '<i class="fa fa-twitter w3-hover-opacity"></i>' +
        '<i class="fa fa-linkedin w3-hover-opacity"></i>' +
        '</div>' +
        '<p>Powered by eFiler</p>'
        );
});