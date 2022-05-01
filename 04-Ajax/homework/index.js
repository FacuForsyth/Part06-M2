var url = 'http://localhost:5000/amigos';

var loading = $('#loading');
loading.hide();     // para que no aparezca la imagen de loading y solo cuando cargue

$('#boton').click(function(){
    $('#lista').empty();        //para que no repita la lista de amigos cuando apreto el boton. la limpia, recarga de nuevo
    $.get(`${url}`, function(friends){
        friends.forEach(e =>{
            /*
            let li = document.createElement('li');
            li.ed = e.id;
            list.innerText = e.name;
            let list = document.getElementById('lista');
            list.appendChild(li);
            */
           $('#lista').append(`<li id="${e.id}">${e.name} X</li>`)
        })
    })
})

$('#search').click(function(){
    let id = $('#input').val();         //val() es un metodo de jquery. VER
    if(id) {
        // hago get (url/id) -> id es el num del amigo
        $.get(`${url}/${id}`, function(friend){
            $('#amigo').text(`Nombre: ${friend.name}, Edad: ${friend.age}, Email: ${friend.email}`);
            //vaciar el imput
            $('input').val("");
        });
    } else {
        $('amigo').text('Tenes que ingresar un ID');
    }
})

$('#delete').click(function(){
    let id = $('#inputDelete').val();
    let friend;
    if(id){
        $.get(`${url}/${id}`, function(f){
            friend = f;
        })
        //ajax recibe un objeto con tres propiedades: url, type, sucess
        $.ajax({
            url: `${url}/${id}`,
            type: "DELETE",
            success: function(){        //para cuando termine de borrar
                $('#success').text(`Tu amigo ${friend.name} fue eliminado correctamente`);
                $('inputDelete').val("");   //limpia el campo
                snowFriends();  // actualiza la lista
            }
        })
    } else {
        $('success').text('Tenes que ingresar un ID');
    }
})