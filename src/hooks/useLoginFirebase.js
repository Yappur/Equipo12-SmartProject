import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export const useLoginFirebase = () => {
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  const login = async ({ email, password }) => {
    setCargando(true);
    setError(null);

    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const idToken = await user.getIdToken();

      // Enviar el token a tu backend para validarlo
      const respuesta = await fetch('https://backend-foo-talent.onrender.com/auth/verify-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idToken })
      });

      if (!respuesta.ok) {
        throw new Error("Token inválido");
      }

      const data = await respuesta.json();
      return data; // Aquí puedes retornar los datos del usuario
    } catch (err) {
      setError(err.message || "Error al iniciar sesión");
      return null;
    } finally {
      setCargando(false);
    }
  };

  return { login, error, cargando };
};
