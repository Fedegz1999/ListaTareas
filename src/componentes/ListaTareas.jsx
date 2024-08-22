import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editarTarea, eliminarTarea } from '../redux/actions';
import {db, auth} from '../firebase/firebase';
import { updateDoc, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { completarTarea } from '../redux/actions';


function ListaTareas() {

    const dispatch = useDispatch();
    const tareas = useSelector((state) => state.tareas);
    const [editando, setEditando] = useState(null);
    const [valorEditado, setValorEditado] = useState("");
       
const handleEditarTarea = async (id, texto) => {
  const user = auth.currentUser;
  if (!user) throw new Error('Usuario no autenticado');

  try {
      const tareaRef = doc(db, 'tareas', id);
      const tareaDoc = await getDoc(tareaRef);
      if (tareaDoc.exists() && tareaDoc.data().usuarioId === user.uid) {
          dispatch(editarTarea({ id, texto }));
          await updateDoc(tareaRef, { texto });
          setEditando(null);
      } else {
          //console.error('Tarea no encontrada o no pertenece al usuario');
      }
  } catch (e) {
     // console.error('Error al editar documento:', e);
  }
};


const confirmarEdicion = (id) => {
  handleEditarTarea(id, valorEditado);
  setEditando(null);
};

const handleEliminarTarea = async (id) => {
  const user = auth.currentUser;
  if (!user) throw new Error('Usuario no autenticado');

  try {
      const tareaRef = doc(db, 'tareas', id);
      const tareaDoc = await getDoc(tareaRef);
      if (tareaDoc.exists() && tareaDoc.data().usuarioId === user.uid) {
          dispatch(eliminarTarea(id));
          await deleteDoc(tareaRef);
      } else {
         // console.error('Tarea no encontrada o no pertenece al usuario');
      }
  } catch (e) {
    //  console.error('Error al eliminar documento:', e);
  }
};

const handleCompletarTarea = async (id) => {
  const user = auth.currentUser;
  if (!user) throw new Error('Usuario no autenticado');
  try {
      const tareaRef = doc(db, 'tareas', id);
      const tareaDoc = await getDoc(tareaRef);
      if (tareaDoc.exists() && tareaDoc.data().usuarioId === user.uid) {
          dispatch(completarTarea(id));
          await updateDoc(tareaRef, {
              completada: !tareas.find(tarea => tarea.id === id).completada
          });
      } else {
         // console.error('Tarea no encontrada o no pertenece al usuario');
      }
  } catch (error) {
     // console.error('Error al completar tarea:', error);
  }
};

    


      

    return(
<ul className='text-[16px] xl:text-[20px] w-[95%] sm:w-[90%]  xl:w-[60%] flex flex-col-reverse gap-[15px]'>
{tareas.map(tarea => (

<li className={`py-[5px] px-[5px] h-[50px] border-b border-gray-300 flex justify-between`} key={tarea.id}>
{editando === tarea.id ? (
    <>
                <input
                className='w-[150px] md:w-[200px] h-[30px] md:h-[40px] text-[16px] md:text-[20px] border-solid border-[1px] border-gray-500 px-[10px] py-[5px] rounded-md shadow-sm'
                  type="text"
                  defaultValue={tarea.texto}
                  onChange={(e) => setValorEditado(e.target.value)}
                  />
                  <span className='flex gap-[10px]'>
                <button className="bg-[#90d47d] px-[7px] py-[2px] text-[11px] sm:text-[15px] rounded-md text-green-900 hover:bg-opacity-80 transition-all duration-150" onClick={()=>confirmarEdicion(tarea.id)}>Confirmar</button>
                <button className="bg-[#ec3d22] px-[7px] py-[2px] text-[11px] sm:text-[15px] rounded-md text-red-950 hover:bg-opacity-80 transition-all duration-150"onClick={() => setEditando(null)}>Cancelar</button>
                </span>
              </>
            
        ) : ( 
                <>
                <span className={` ${tarea.completada ? "line-through decoration-orange-500" : ""} max-w-[60%] overflow-hidden`}>{tarea.texto}</span>
                <span className='flex gap-[6px] lg:gap-[10px]'>
                <button className="bg-blue-400 px-[7px] py-[2px] text-[11px] sm:text-[15px] rounded-md text-green-900 hover:bg-opacity-80 transition-all duration-150" onClick={() => setEditando(tarea.id)}>Editar</button>
                <button className="bg-[#ec3d22] px-[7px] py-[2px] text-[11px] sm:text-[15px] rounded-md text-red-950 hover:bg-opacity-80 transition-all duration-150" onClick={() => handleEliminarTarea(tarea.id)}>Eliminar</button>
                <button className="bg-purple-400 px-[7px] py-[2px] text-[11px] sm:text-[15px] rounded-md text-red-950 hover:bg-opacity-80 transition-all duration-150" onClick={() => handleCompletarTarea(tarea.id)}>{tarea.completada ? 'Desmarcar' : 'Completar'}</button>
                </span>
                </>
    )}
          </li>
))}




</ul>
    )
}

export default ListaTareas;