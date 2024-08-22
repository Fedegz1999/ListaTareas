import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase'; 
import { useNavigate } from 'react-router-dom';

function FormRegistro() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleRegistro = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('El email no es válido');
      return;
    }
    if (!validatePassword(password)) {
      setError('La contraseña debe tener al menos 8 caracteres, incluir letras mayúsculas y minúsculas, números y caracteres especiales');
      return;
    }
    setLoading(true); 
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setLoading(false); 
      navigate('/tareas'); 
      setModal(false); 
    } catch (error) {
     // console.error('Error al registrar usuario:', error);
      setError(error.message);
      setLoading(false); 
    }
  };

  const abrirModal = () => setModal(true);
  const cerrarModal = () => setModal(false);

  return (
    <>
      {!modal ? (
        <button 
          onClick={abrirModal}
          className='md:text-[16px] text-[14px] p-[10px] border-[1px] border-green-900 rounded-md bg-[#40C9A2] hover:bg-opacity-80 transition-all duration-300'>
          Registrarse
        </button>
      ) : (
        <div className='w-full h-screen bg-black bg-opacity-80 flex items-center justify-center absolute top-0 left-0'>
          <form onSubmit={handleRegistro} className='relative flex flex-col justify-center bg-yellow-200 gap-[50px] w-[80%] lg:w-[60%] items-center py-[20px] h-[500px] border-[1px] border-[#F2F2F2] rounded-md shadow-xl'>
            <button 
              onClick={cerrarModal} 
              type="button" 
              className='hover:bg-black hover:bg-opacity-20 px-[8px] py-[3px] right-[1%] top-[1%] absolute rounded-md cursor-pointer duration-200'>
              ❌
            </button>
            <h1 className="font-semibold text-[25px] ">Registro</h1>
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
            <button 
              className='md:text-[16px] text-[14px] p-[10px] border-[1px] border-green-900 rounded-md bg-green-300 hover:bg-green-400 transition-all duration-300'
              type="submit"
              disabled={loading} 
            >
              {loading ? 'Cargando...' : 'Registrarse'}
            </button>
            {error && <p className='absolute bottom-[2%] px-[10px] text-[11px] md:text-[15px] font-bold text-red-500'>{error}</p>}
          </form>
          {loading && (
            <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 flex items-center justify-center'>
              <p className='text-white text-lg'>Cargando...</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default FormRegistro;
