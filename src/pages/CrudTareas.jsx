import React, { useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import AddTarea from "../componentes/AddTarea.jsx"
import ListaTareas from '../componentes/ListaTareas.jsx';
import { cargarTareas } from '../redux/actions.js';
import {db, auth} from '../firebase/firebase.js';
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from 'firebase/auth';


function CrudTareas() {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);


  

  useEffect(() => {
    const obtenerTareas = async () => {
        try {
            const user = auth.currentUser;
            if (!user) throw new Error('Usuario no autenticado');

            const tareasRef = collection(db, 'tareas');
            const q = query(tareasRef, where('usuarioId', '==', user.uid));
            const querySnapshot = await getDocs(q);

            const tareasObtenidas = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            dispatch(cargarTareas(tareasObtenidas));
        } catch (e) {
            console.error('Error al obtener las tareas:', e);
        }
    };

    if (user) {
        obtenerTareas();
    }
}, [dispatch, user]);





  const handleSignOut = async () => {
    try {
      await signOut(auth);
      window.location.href = '/';
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const botonInicio = () => {window.location.href = '/';}

  return (
    <>
      {user ? ( 
        <section className="h-screen w-full flex justify-center items-center font-cursive bg-[#F4F4F4]">
          <div className="bg-[#FFF] relative h-max min-h-[600px] w-[90%] sm:w-[80%] md:w-[70%] shadow-md rounded-md flex flex-col justify-start items-center py-[20px] gap-[20px]">
           <button onClick={handleSignOut} className='bg-red-400 hover:bg-red-300 duration-200 px-[10px] py-[5px] text-[11px] right-[1%] md:absolute rounded-md'>Cerrar sesión</button>
            <h1 className="font-semibold text-[25px]">Lista de tareas</h1>
            <span className="w-[80%] h-[1px] bg-gray-100"></span>
            <AddTarea />
            <ListaTareas />
          </div> 
        </section>
      ) : (
        <div className='flex items-center justify-center bg-[#F4F4F4] h-screen w-full relative shadow-md flex-col gap-[20px]'>
        <p className="font-semibold text-[25px] px-[10px] md:text-left text-center leading-tight">Por favor, inicia sesión para ver tus tareas.</p>
        <button onClick={botonInicio} className='py-[10px] px-[20px] w-max bg-yellow-300 hover:bg-yellow-400 duration-200 text-[20px] rounded-md shadow-md'>⬅️ Ir al inicio</button>
        </div>
      )}
    </>
  );

}  
export default CrudTareas;
