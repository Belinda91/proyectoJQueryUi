//Punto 1 :Temas
$(document).ready(function(){
     $("#fechaini").addClass("azulito");
	$("#abrir").click(function(){
//        $("body").addClass("negrito");
//        $("#fechaini").addClass("azulito");
		
	});
    $("#abrir2").click(function(){
//        $("body").removeClass("negrito");
//		$("body").addClass("azulito");
	});
});

//Punto 2: Apis
$(function() {
            $('#city').focus( function() {
				
				$(this).autocomplete( "search", "" );
				
			});
            //Para comprobar que la longitud introducida en el codigo postal es la correcta
            $("#zip").keyup(function() {
				var zip_in = $(this);
				var zip_box = $('#zipbox');
				
				if (zip_in.val().length<5)
				{
					zip_box.removeClass('error success');
				}
				else if ( zip_in.val().length>5)
				{
					zip_box.addClass('error').removeClass('success');
				}
				else if ((zip_in.val().length == 5) ) 
				{
                    $.ajax({
						url: "http://api.zippopotam.us/es/" + zip_in.val(),
						cache: false,
						dataType: "json",
						type: "GET",
					  success: function(result, success) {	

							$('#citybox').slideDown();
							$('#statebox').slideDown();

							cuidad = [];
							set = {};
							region = [];
							
							for ( ii in result['places']){
								cuidad.push(result['places'][ii]['place name']);
								
								state = result['places'][ii]['state'] ;
								if ( !(state in set) )
								{
									set[state] = true;
									region.push(state);
								}
							}
														
							$("#city").autocomplete({ source : cuidad , delay:50, disabled: false, minLength:0 });
							$("#state").autocomplete({ source: region, delay:50 , disabled: false, minLength:0 });
							if (result['places'].length > 0){
								$('#city').val(cuidad[0]);
								$('#state').val(region[0]); 
							}
							zip_box.addClass('success').removeClass('error');
						},
						error: function(result, success) {
							zip_box.removeClass('success').addClass('error');
						}
					});
				}
	});
		});
        
 //Función que comprueba desde los 3 primeros dígitos que le pasas y te devuelve las diferentes opciones posibles
$(function () {
          var getData = function (request, response) {
              $.getJSON(
                  "http://gd.geobytes.com/AutoCompleteCity?callback=?&q=" + request.term,
                  function (data) {
                      response(data);
                  });
          };
            var selectItem = function (event, ui) {
            $("#myText").val(ui.item.value);
            return false;
        }
            $("#myText").autocomplete({
            source: getData,
            select: selectItem,
            minLength: 3
        });
    });



//Punto3: DatePicker
//Creacion de calendario y se pone el número de meses que se quieren ver

$(document).ready(function() {
    var startDate;
    var endDate;
    
    $("#fechaini").datepicker({
        numberOfMonths: 1,
        showButtonPanel: true,
        showAnim: "fade",
        minDate: 0,
        addClass:"negrito"
        
    });
    
     $("#fechafin").datepicker({
        numberOfMonths: 1,
        showButtonPanel: true,
        showAnim: "fade",
        minDate: 0,
        addClass:"negrito"
    })
    
    $('#fechaini').change(function() {
        startDate = $(this).datepicker('getDate');
        $("#fechafin").datepicker("option", "minDate", startDate );
        });
})

//Ponerlo en Español
 $.datepicker.regional['es'] = {
 closeText: 'Cerrar',
 prevText: '< Ant',
 nextText: 'Sig >',
 currentText: 'Hoy',
 monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
 monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
 dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
 dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
 dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá'],
 weekHeader: 'Sm',
 dateFormat: 'dd/mm/yy',
 firstDay: 1,
 isRTL: false,
 showMonthAfterYear: false,
 yearSuffix: ''
 };
 $.datepicker.setDefaults($.datepicker.regional['es']);
$(function () {
$("#fecha").datepicker();
});

//Documentación de confirmacion
var circle = document.getElementById('circle');
var check = document.getElementById('checkmark');
var box = document.getElementById('check');


function startoffFunctions() {
animate();
setTimeout(function(){revealMessage();}, 2000);
  
}


function animate() {
circle.style.display = 'block';
setTimeout(function(){circle.style.display = 'none';check.style.display = 'block';}, 2000);
  
}

//Función confirmación borrado
function Boton() {
    var mensaje = confirm("¿Estás seguro de borrar los campos?");

    if (mensaje) {
    alert("¡Gracias por aceptar!");
    }

    else {
    alert("¡Has denegado el mensaje pero...Te los vamos a borrar igual!");
    }
    }

//Punto4: Efectos
//1.Esconder/mostrar/Bounce y Slide
$(document).ready(function() {

            $("#show").click(function () {
               $(".mydiv").show("bounce", {times:3}, 1000 );
            });

            $("#hide").click(function () {
               $(".mydiv").hide( "slide", { direction: "down"  }, 1000  );
            });
				
         });




//Dialog
$(function () {
    $("#dialogo1").dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            "Cerrar": function () {
                $(this).dialog("close");
            }
        }         
    });
    
    $("#abrir")
        .button()
        .click(function () {
        $("#dialogo1").dialog("open");
    }).parents('.ui-dialog:eq(0)').wrap("<div id='dialogo1'></div>");
});


$(function () {
    $("#dialogo2").dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            "Cerrar": function () {
                $(this).dialog("close");
            }
        }         
    });
    $("#abrir2")
        .button()
        .click(function () {
        $("#dialogo2").dialog("open");
    }).parents('.ui-dialog:eq(0)').wrap("<div id='dialogo2'></div>");
});

