$(function(){
    read();
    
    $(document).on('click','span.delete',function(){ // al click preleva l'id dell'elemento selezionato
       let idElemento= $(this).parent().attr('data-id');
       deleteElement(idElemento); // passa l'id come parametro alla fuzione elimina
    });

    $('#passaggioValore').on('click', function(){ // al click preleva il valore dal campo di input
        let val=$('input#valore').val();
        create(val); // passa il valore come parametro alla funzione crea
    })

    $(document).on('click','.modificaValore',function(){ // al click preleva il valore dal campo di input assieme all'id
        let val=$('input.updateElement').val();
        let idElemento= $(this).parent().attr('data-id');
        update(idElemento,val) // passa i due valori come parametro alla funzione
     });
    
});



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

// funzione delete elimina //per eliminare un elemento mi servirà l'id!
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

// funzione update aggiorna //per aggiornare un elemento mi servirà l'id!
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

// funzione compila e stampa elementi
function handlebarsCompile(response){
    let source = document.getElementById("entry-template").innerHTML;
    let template = Handlebars.compile(source);

    for(let i=0; i<response.length; i++){
        let context = { text: response[i].text, id: response[i].id };
        let html = template(context);

        $('.container').append(html);
    };
};