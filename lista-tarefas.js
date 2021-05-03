//variavel que tem um Array. Tarefas serão guardadas neste array
let tarefas = [];   

//adiciona o evento onclick ao botão e atribui a funcao adicionarTarefa
document.querySelector("#adicionar-tarefa").onclick = adicionarTarefa;      

//adiciona o evento onfocus ao campo input que chama a funcao para limpar a mensagem de erro
document.querySelector("#tarefa").onfocus = () => {     
    document.querySelector("#erro-input").innerHTML = "";
};


//funcao chamada ao clique do botao
function adicionarTarefa() {            
    //variavel que recebe o  valor adicionado no input
    const novaTarefa = document.querySelector("#tarefa").value;     

    //condicao para validar o campo vazio do input
    if(novaTarefa == "") {          
        //mensagem de erro
        document.querySelector("#erro-input").innerHTML = "Insira uma tarefa";      
        //para a execucao da funcao pq o input é ivalido
        return;
    }

    //adiciona nova tarefa ao Array com o status não concluida
    tarefas.push({nome:novaTarefa, concluida: false});          

    //limpa o texto digitado no input
    document.querySelector("#tarefa").value = ""; 
    //limpa a lista de tarefas existente              
    document.querySelector("#lista-tarefas").innerHTML = "";    

    //laço para percorrer todo o Array
    for(let i = 0; i < tarefas.length; i++) { 
        //condicao para o status da tarefa      
        if(tarefas[i].concluida == true) {          
            document.querySelector("#lista-tarefas").innerHTML = document.querySelector("#lista-tarefas").innerHTML + `<li class="tarefa-marcada" data-tarefa='${i}'><input class="marcar-tarefa" type="checkbox" checked="checked"/>${tarefas[i].nome}</li>`;
        }else {
            document.querySelector("#lista-tarefas").innerHTML = document.querySelector("#lista-tarefas").innerHTML + `<li  data-tarefa='${i}'><input class="marcar-tarefa" type="checkbox"/>${tarefas[i].nome}</li>`;

        }
    }

    //variavel recebe as listas de elementos com a classe .marcar-tarefa ( inputs checkbox )
    let listaDeCheckbox = document.querySelectorAll(".marcar-tarefa");      
    
    //laço para percorrer todos inputs checkbox
    for(i = 0; i < listaDeCheckbox.length; i++) {       
        //adiciona o evento onchange que chama a funcao checkboxClicado
        listaDeCheckbox[i].onchange = checkboxClicado;      
    }
}

//funcao recebe o parametro 'evento' do tipo event object com informações do evento que aconteceu
function checkboxClicado(evento) {          
    //verifica se o input checkbox esta marcado. target é a propriedade do objeto evento que localiza o elemento que disparou o evento
    if(evento.target.checked == true) {  
        //adiciona .tarefa-marcada a lista de classes do elemento pai (<li>) do elemento que disparou o evento (input checkbox)  
        evento.target.parentElement.classList.add("tarefa-marcada"); 
        //variavel recebe o atributo data-tarefa que guarda o indice das tarefas que foram adicionadas no array
        let indiceDaTarefa = evento.target.parentElement.getAttribute("data-tarefa");
        //localiza a tarefa pelo indice e altera o status da tarefa para true - concluida
        tarefas[indiceDaTarefa].concluida = true;
    }else {
        //remove a .tarefa-marcada da lista de classes do elemento pai (<li>) 
        evento.target.parentElement.classList.remove("tarefa-marcada");
        //localiza a tarefa pelo indice e altera o status da tarefa para false - ao concluida
        tarefas[indiceDaTarefa].concluida = false;
    }
}



