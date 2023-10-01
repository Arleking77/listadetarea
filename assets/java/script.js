document.addEventListener("DOMContentLoaded", function () {
    const arrTareas = [];

    const tBody = document.querySelector("#tablaTareas tbody");
    const btnAgregar = document.querySelector("#btnAgregar");
    const nuevaTarea = document.querySelector("#nuevaTarea");
    const total = document.querySelector("#total");
    const realizadas = document.querySelector("#realizadas");

    const traeNumeroTareasRealizadas = () => {
        const tareasRealizadas = arrTareas.filter(
            (tarea) => tarea.realizada === true
        );
        return tareasRealizadas.length;
    }

    const actualiza = function (idSeleccionado, objCheckbox) {
        const indexTarea = arrTareas.findIndex((tarea) => tarea.id === idSeleccionado);
        arrTareas[indexTarea].realizada = objCheckbox.checked;
        realizadas.innerHTML = traeNumeroTareasRealizadas();
    }

    const borrar = function (idSeleccionado) {
        const indexTarea = arrTareas.findIndex((tarea) => tarea.id === idSeleccionado);
        if (confirm(`Desea eliminar esta tarea:\n id: ${idSeleccionado} - tarea: ${arrTareas[indexTarea].tarea}\n¿Desea continuar?`)) {
            arrTareas.splice(indexTarea, 1);
            mostrarTareas();
        }
    }

    const mostrarTareas = function () {
        let detalleTareas = "";
        total.innerHTML = arrTareas.length;
        realizadas.innerHTML = traeNumeroTareasRealizadas();
        tBody.innerHTML = "";

        arrTareas.forEach((tarea) => {
            detalleTareas += `
            <tr>
                <td class='center'>${tarea.id}</td>
                <td>${tarea.tarea}</td>
                <td class='center'><input type='checkbox' class='checkbox' ${tarea.realizada ? 'checked' : ''}></td>
                <td class='center'><button class='eliminar' data-id="${tarea.id}"><i class="fas fa-trash-alt"></i></button></td>
            </tr>`;
        });

        tBody.innerHTML = detalleTareas;

  
        const botonesEliminar = document.querySelectorAll(".eliminar");
        botonesEliminar.forEach((boton) => {
            boton.addEventListener("click", () => {
                const idTarea = parseInt(boton.getAttribute("data-id"));
                borrar(idTarea);
            });
        });

        const checkboxes = document.querySelectorAll(".checkbox");
        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener("click", () => {
                const idTarea = parseInt(checkbox.closest("tr").querySelector(".center").textContent);
                actualiza(idTarea, checkbox);
            });
        });
    }

    btnAgregar.addEventListener("click", () => {
        if (nuevaTarea.value.trim() !== "") {
            let newId = arrTareas.length > 0 ? Math.max(...arrTareas.map((tarea) => tarea.id)) + 1 : 1;
            arrTareas.push({ id: newId, tarea: nuevaTarea.value, realizada: false });
            nuevaTarea.value = "";
            mostrarTareas();
        } else {
            alert("Atención!\nNo estas ingresando ninguna tarea.");
        }
    });

    mostrarTareas();
});

