import { createStore } from 'redux';

const initialState = {
 tareas: []
};


function reducer(state = initialState, action) {
  switch (action.type) {
    case 'CARGAR_TAREAS':
      return {
        ...state,
        tareas: action.payload
      };
    case 'AGREGAR_TAREA':
        return {
          ...state,
          tareas: [...state.tareas, action.payload]
        };
        case 'EDITAR_TAREA':
      return {
        ...state,
        tareas: state.tareas.map((tarea) =>
          tarea.id === action.payload.id ? { ...tarea, texto: action.payload.texto } : tarea
        )
      };
       case 'ELIMINAR_TAREA':
      return {
        ...state,
        tareas: state.tareas.filter((tarea) => tarea.id !== action.payload.id)
      };
      case 'COMPLETAR_TAREA':
      return {
        ...state,
        tareas: state.tareas.map(tarea =>
          tarea.id === action.payload.id
            ? { ...tarea, completada: !tarea.completada }
            : tarea
        )
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

export {reducer, store};


