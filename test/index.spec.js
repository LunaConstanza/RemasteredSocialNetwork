// importamos la funcion que vamos a testear
import { registerUser, login, registerGoogle, resetPass } from "../src/lib/auth.js";

import { 
  auth,
  provider,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from '../src/lib/index.js';

jest.mock('../src/lib/index.js', () => ({
    createUserWithEmailAndPassword: jest.fn(),
    auth: jest.fn()
}));

describe('registerUser', () => {
  const email = 'prueba0@gmail.com';
  const password = '123456';
  const displayName = 'Prueba';
  const date = '1994-09-21';

  it('debería ser una función', () => {
    expect(typeof registerUser).toBe('function');
  });

  it('debería ejecutar createUserWithEmailAndPassword', async () => {
    await registerUser(email, password, displayName, date)
    return expect(createUserWithEmailAndPassword).toHaveBeenCalled();
  });

  it('debería ejecutar createUserWithEmailAndPassword', async () => {
    await registerUser(email, password, displayName, date)
    return expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, email,password);
  });
});
