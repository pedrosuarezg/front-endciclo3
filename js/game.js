function autoTraeCategoria(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://144.22.57.120:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-category");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    
    })
}
//Manejador GET
function traerInformacionGame() {
    $.ajax({
        url:"http://144.22.57.120:8080/api/Game/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response);
            pintarRespuestaGame(response);
        }

    });

}

function pintarRespuestaGame(response){

    let myTable = "<table class='ui center aligned celled table'>" + 
    "<thead><tr><th>NOMBRE JUEGO</th><th>DESARROLLADOR</th><th>AÑO</th><th>DESCRIPCION</th><th>CATEGORIA.NAME</th><th colspan='3'></th></tr></thead>";
    for(i=0;i<response.length;i++){
    myTable+="<tr>";
        myTable+="<td>" + response[i].name + "</td>";
        myTable+="<td>" + response[i].developer + "</td>";
        myTable+="<td>" + response[i].year + "</td>";
        myTable+="<td>" + response[i].description + "</td>";
        myTable+="<td>" + response[i].category.name + "</td>";
        myTable+='<td><button class = "botonSkate2" onclick="borrar(' + response[i].id + ')">Borrar game!</button></td>';
        myTable+='<td><button class = "botonSkate2" onclick="cargarDatosGame(' + response[i].id + ')">Editar Game!</button></td>';
        myTable+='<td><button class = "botonSkate2" onclick="actualizar(' + response[i].id + ')">Actualizar Game!</button></td>'
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#miListaGame").html(myTable);
}
//Capturar informacion para Actualizar
function cargarDatosGame(id) {
    $.ajax({
        dataType: 'json',
        url:"http://144.22.57.120:8080/api/Game/"+id,
        
        type: 'GET',

        success: function (response) {
            console.log(response);
            var item = response;

            $("#id").val(item.id);
            $("#namejuegos").val(item.name);
            $("#developer").val(item.developer);
            $("#year").val(item.year);
            $("#descriptionjuegos").val(item.description);

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function agregarGame() {

    if($("#namejuegos").val().length == 0 || $("#developer").val().length == 0 || $("#year").val().length == 0 || $("#descriptionjuegos").val().length == 0){
       alert("Todos los campos son obligatorios")
    }else{

            let elemento = {
                name: $("#namejuegos").val(),
                developer: $("#developer").val(),
                año: $("#año").val(),
                description: $("#descriptionjuegos").val(),
                category:{id: +$("#select-category").val()},
            }

            let dataToSend = JSON.stringify(elemento);
            console.log(elemento);

            $.ajax({
                type: "POST",
                contentType: "application/json",
                url:"http://144.22.57.120:8080/api/Game/save",
                data: dataToSend,
                datatype: 'json',

                success: function (response) {
                    console.log(response);
                    console.log("Se guardo Correctamente");
                    //Limpiar Campos
                    $("#miListaGame").empty();
                    $("#namejuegos").val("");
                    $("#developer").val("");
                    $("#year").val("");
                    $("#descriptionjuegos").val("");
                    

                    //Listar Tabla

                    alert("Se ha guardado Correctamente!")
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("No se Guardo Correctamente")
                }
            });
    }
}
//Manejador DELETE
function borrar(idElemento) {
    var elemento = {
        id: idElemento
    }

    var dataToSend = JSON.stringify(elemento);
console.log(dataToSend);
    $.ajax(
        {
            dataType: 'json',
            data: dataToSend,
            url:"http://144.22.57.120:8080/api/Game/"+idElemento,
            type: 'DELETE',
            contentType: "application/JSON",
            success: function (response) {
                console.log(response);
                $("#miListaGame").empty();

                alert("se ha Eliminado Correctamente!")
            },

            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Elimino Correctamente!")
            }
        });
}

//Manejador PUT
function actualizar(idElemento) {
    
    if($("#namejuegos").val().length == 0 || $("#developer").val().length == 0 || $("#year").val().length == 0 || $("#descriptionjuegos").val().length == 0){
        alert("Todos los campos deben estar llenos")
    }else{
        let elemento = {
            id: idElemento,
            name: $("#namejuegos").val(),
            developer: $("#developer").val(),
            year: $("#year").val(),
            description: $("#descriptionjuegos").val(),
            category:{id: +$("#select-category").val()},
        }

        console.log(elemento);
        let dataToSend = JSON.stringify(elemento);

        $.ajax({
            datatype: 'json',
            data: dataToSend,
            contentType: "application/JSON",
            url:"http://144.22.57.120:8080/api/Game/update",
            type: "PUT",

            success: function (response) {
                console.log(response);
                $("#miListaGame").empty();
                listarGame();
                alert("se ha Actualizado Correctamente!")

                //Limpiar Campos
                $("#miListaGame").empty();
                $("#id").val("");
                $("#namejuegos").val("");
                $("#developer").val("");
                $("#year").val("");
                $("#descriptionjuegos").val("");


            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Actualizo Correctamente!")
            }
        });
    }
}
