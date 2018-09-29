// Variables
const listaTareas = document.getElementById('lista-tweets');

// Event Listeners
eventListeners();

function eventListeners() {
    // Cuando se envia el formulario
    document.getElementById('formulario').addEventListener('submit', agregarTarea);

    // Borrar tareas
    listaTareas.addEventListener('click', borrarTarea);

    // Recuperando tareas LS
    document.addEventListener('DOMContentLoaded', cargaLS);
}


// Funciones

function agregarTarea(e) {
    e.preventDefault();

    // Leer valor del text area
    const tarea = document.getElementById('tweet').value;

    // Crear botón de borrar
    const borrar = document.createElement('a');
    borrar.className = 'borrar-tweet';
    borrar.innerText = 'X';

    // Crear elemento LI y añadir contenido a la lista
    const li = document.createElement('li');
    li.innerText = tarea;
    // Añade botón borrar
    li.appendChild(borrar);
    // Añadiendo en LI a la lista de tareas DOM
    listaTareas.appendChild(li);

    // Enviando a LocalStorage
    agregarLocalStorage(tarea);

}

// Borrar tarea del DOM
function borrarTarea(e) { 
    e.preventDefault();

    // Detectar clic en X para borrar
    if(e.target.className === 'borrar-tweet') {
        // alert('¿Desea borrar?');
        e.target.parentElement.remove();
        borrarLS(e.target.parentElement.textContent);

    }
}

// Reimprime elementos de LS 
function cargaLS() {
    let tareas;
    tareas = obtenerLS();

    tareas.forEach(function(tarea){
        // Crear botón de borrar
        const borrar = document.createElement('a');
        borrar.className = 'borrar-tweet';
        borrar.innerText = 'X';

        // Crear elemento LI y añadir contenido a la lista
        const li = document.createElement('li');
        li.innerText = tarea;
        // Añade botón borrar
        li.appendChild(borrar);
        // Añadiendo en LI a la lista de tareas DOM
        listaTareas.appendChild(li);
    });
}

// Añadiendo a Local Storage
function agregarLocalStorage(tarea) {
    let tareas;
    tareas = obtenerLS();
    
    // añadir tarea
    tareas.push(tarea);

    // Convertir de string a arreglo para local storage
    localStorage.setItem('tareas', JSON.stringify(tareas));


}

// Comprobando que haya elementos en LS, retorna un arreglo
function obtenerLS() {
    let tareas;

    if(localStorage.getItem('tareas') === null) {
        tareas = [];
    } else {
        tareas = JSON.parse(localStorage.getItem('tareas'));
    }
    return tareas;
}

// Borrando tarea de LS
function borrarLS(tarea) {
    let tareas, tareasBorrar;

    // Elimina la X de la tarea
    tareasBorrar = tarea.substring(0, tarea.length - 1);

    
    tareas = obtenerLS();

    tareas.forEach(function(tarea, index){
        if(tareasBorrar === tarea) {
            tareas.splice(index, 1);
        }
    });

    localStorage.setItem('tareas', JSON.stringify(tareas));
}
