$(function(){
    read();
    
    $(document).on('click','span.delete',function(){
       let idElemento= $(this).parent().attr('data-id');
       deleteElement(idElemento);
    });

    $('#passaggioValore').on('click', function(){
        let val=$('input#valore').val();
        create(val);
    })

    $(document).on('click','.modificaValore',function(){
        let val=$('input.updateElement').val(); // il valore da passare 
        let idElemento= $(this).parent().attr('data-id'); // mi ritorna l'id elemento selezionato
        //console.log(idElemento,val)
        update(idElemento,val)
     });
    
});

 // funzione update aggiorna // per aggiornare un elemento mi servirà l'id!
function update(id,data){
    $.ajax({
        method: "PATCH",
        url: "http://157.230.17.132:3015/todos/" + id,
        data:{
            text: data
        },
        success: function (response) {
            $('.container').html('');
            read();
        },
        error: function(errore){
            console.log('errore ' + errore)
        }
    });
} 

// funzione read lettura
function read(){
    $.ajax({
        method: "GET",
        url: "http://157.230.17.132:3015/todos",
        success: function (response) {
            handlebarsCompile(response);
        },
        error: function(errore){
            console.log('errore ' + errore);
        }
    });
}

// funzione create creazione
function create(data){
    $.ajax({
        method: "POST",
        url: "http://157.230.17.132:3015/todos",
        data:{
            text: data
        },
        success: function(response){
            $('.container').html('');
            read();
        },
        error: function(errore){
            console.log('errore ' + errore);
        }
    });
}

// funzione delete elimina
function deleteElement(id){
    $.ajax({
        method: "DELETE",
        url: "http://157.230.17.132:3015/todos/" + id,
        success: function (response) {
            $('.container').html('');
            read();
        },
        error: function(errore){
            console.log('errore ' + errore)
        }
    });
}

/* // funzione update aggiorna // per aggiornare un elemento mi servirà l'id!
function update(id,data){
    $.ajax({
        method: "UPDATE",
        url: "http://157.230.17.132:3015/todos/" + id,
        data:{
            text: data
        },
        success: function (response) {
            $('.container').html('');
            read();
        },
        error: function(errore){
            console.log('errore ' + errore)
        }
    });
} */


// funzione compila e stampa 
function handlebarsCompile(response){
    let source = document.getElementById("entry-template").innerHTML;
    let template = Handlebars.compile(source);

    for(let i=0; i<response.length; i++){
        let context = { text: response[i].text, id: response[i].id };
        let html = template(context);

        $('.container').append(html);
    };
};