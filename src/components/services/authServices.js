import jitterAPI from '../config/api';

export async function signUp(data) {
  const res = await jitterAPI.post('/auth/signup', data);
  return res.data;
}

export async function signIn(data) {
  const res = await jitterAPI.post('/auth/login', data);
  return res.data;
}
