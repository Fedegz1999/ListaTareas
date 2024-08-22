export const cargarTareas = (tareas) => ({
  type: 'CARGAR_TAREAS',
  payload: tareas
});

export const agregarTarea = (tarea) => ({
    type: 'AGREGAR_TAREA',
    payload: tarea
  });
  
  export const editarTarea = (tarea) => ({
    type: 'EDITAR_TAREA',
    payload: tarea
  });
  
  export const eliminarTarea = (id) => ({
    type: 'ELIMINAR_TAREA',
    payload: { id }
  });

  export const completarTarea = (id) => ({
    type: 'COMPLETAR_TAREA',
    payload: { id }
  });