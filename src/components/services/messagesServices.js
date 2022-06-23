import jitterAPI from '../config/api';

export async function getMessages() {
  const res = await jitterAPI.get('/messages');
  // console.log(res);
  return res.data;
}

export async function createMessage(data) {
  const res = await jitterAPI.post('/messages', data);
  return res.data;
}

export async function getMyMessages() {
  const res = await jitterAPI.get('/messages/mymessages');
  return res.data;
}

export async function getMessagesByUser(username) {
  const res = await jitterAPI.get(`/messages?username=${username}`);
  return res.data;
}
