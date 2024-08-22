import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { agregarTarea } from '../redux/actions';
import {db, auth} from '../firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';


function AddTarea() {
    const [nuevoTexto, setNuevoTexto] = useState('');
    const dispatch = useDispatch();

    const handleAgregarTarea = async () => {
      if(nuevoTexto === "") {
        document.getElementById('inputAddTarea').style.borderColor = "red"
        return;
      }
      try {
        document.getElementById('inputAddTarea').style.borderColor = "#e5e7eb";
        const user = auth.currentUser;
        if (!user) throw new Error('Usuario no autenticado');

        const tareasRef = collection(db, 'tareas');
        const nuevaTarea = {
            texto: nuevoTexto,
            completada: false,
            usuarioId: user.uid 
        };
        const docRef = await addDoc(tareasRef, nuevaTarea);
        dispatch(agregarTarea({ id: docRef.id, texto: nuevoTexto, completada: false }));
        setNuevoTexto('');
    } catch (e) {
       // console.error('Error al agregar documento:', e);
    }
};

    return(
    <div className='flex shadow-sm pb-[20px]'>
        <input
        id='inputAddTarea'
        type="text"
        value={nuevoTexto}
        onChange={(e) => setNuevoTexto(e.target.value)}
        className='w-[200px] md:w-[300px] h-[50px] md:text-[16px] text-[14px] border-solid border-[1px] border-gray-200 px-[10px] py-[5px] rounded-l-md shadow-sm'
       placeholder='Agregar una nueva tarea'
      />
       <button
      className='md:text-[16px] text-[14px] p-[10px] border-[1px] border-yellow-300 rounded-r-md bg-yellow-300 hover:bg-yellow-400 transition-all duration-300'
      onClick={handleAgregarTarea}>Agregar
      </button>
    </div>
    )
}

export default AddTarea;