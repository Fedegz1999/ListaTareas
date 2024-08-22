import {reducer} from '../redux/store'; // Importar el reducer desde el archivo donde está definido
import {
  cargarTareas,
  agregarTarea,
  editarTarea,
  eliminarTarea,
  completarTarea
} from '../redux/actions';

describe('Reducer', () => {
  const estadoInicial = {
    tareas: []
  };

  test('Estado inicial', () => {
    expect(reducer(undefined, {})).toEqual(estadoInicial);
  });

  test('CARGAR_TAREAS', () => {
    const tareas = [
      { id: 1, texto: 'Tarea 1', completada: false },
      { id: 2, texto: 'Tarea 2', completada: true }
    ];
    expect(reducer(estadoInicial, cargarTareas(tareas))).toEqual({
      tareas
    });
  });

  test('AGREGAR_TAREA', () => {
    const nuevaTarea = { id: 3, texto: 'Tarea 3', completada: false };
    const estado = { tareas: [{ id: 1, texto: 'Tarea 1', completada: false }] };
    expect(reducer(estado, agregarTarea(nuevaTarea))).toEqual({
      tareas: [...estado.tareas, nuevaTarea]
    });
  });

  test('EDITAR_TAREA', () => {
    const tareaEditada = { id: 1, texto: 'Tarea 1 editada', completada: false };
    const estado = { tareas: [{ id: 1, texto: 'Tarea 1', completada: false }] };
    expect(reducer(estado, editarTarea(tareaEditada))).toEqual({
      tareas: [tareaEditada]
    });
  });

  test('ELIMINAR_TAREA', () => {
    const estado = { tareas: [{ id: 1, texto: 'Tarea 1', completada: false }] };
    expect(reducer(estado, eliminarTarea(1))).toEqual({
      tareas: []
    });
  });

  test('COMPLETAR_TAREA', () => {
    const tarea = { id: 1, texto: 'Tarea 1', completada: false };
    const estado = { tareas: [tarea] };
    expect(reducer(estado, completarTarea(1))).toEqual({
      tareas: [{ ...tarea, completada: true }]
    });
  });
});
