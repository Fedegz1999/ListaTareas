import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import FormRegistro from './FormRegistro';
import { useNavigate } from 'react-router-dom';
import {auth} from '../firebase/firebase';

function FormLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
    //  console.log('Usuario logueado:', userCredential.user);
      navigate('/tareas'); 
    } catch (error) {
      //  console.log(error)
        setError('Error al iniciar sesión. Por favor verifica los datos ingresados.');
    }
  };


  return (
    <div className='flex flex-col w-[90%] lg:w-[50%] h-[90%] justify-center items-center bg-[#2F9C95] border-[1px] shadow-xl rounded-md border-green-900'>
    <form onSubmit={handleLogin} className='flex flex-col justify-center  gap-[40px] w-[80%] lg:w-[60%] items-center  h-max pb-[10px] rounded-md '>
            <h1 className="font-semibold text-[25px] ">Iniciar sesión</h1>
            <input
        className='w-[250px] md:w-[300px] h-[50px] md:text-[16px] text-[14px] border-solid border-[1px] border-gray-200 px-[10px] py-[5px] rounded-l-md shadow-sm'
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className='w-[250px] md:w-[300px] h-[50px] md:text-[16px] text-[14px] border-solid border-[1px] border-gray-200 px-[10px] py-[5px] rounded-l-md shadow-sm'
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
       {error && <p className='h-[50px] px-[10px] text-[11px] md:text-[15px] font-bold text-red-900 text-center'>{error}</p>} 
     <span className='flex gap-[20px]'>
      <button type="submit"
       className='md:text-[16px] text-[14px] p-[10px] border-[1px] border-green-800 rounded-md bg-blue-300 hover:bg-blue-400 transition-all duration-300'
      >Iniciar sesión</button>
      </span>
      </form>
      <FormRegistro/>
      </div>
  );
}

export default FormLogin;
