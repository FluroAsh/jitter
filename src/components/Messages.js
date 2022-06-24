import { useEffect, useState } from 'react';
import { useGlobalState } from '../utils/stateContext';
import { Message } from './Message';
import { useLocation, useParams } from 'react-router-dom';
import {
  getMessages,
  getMessagesByUser,
  getMyMessages,
} from './services/messagesServices';

export const Messages = () => {
  const { store, dispatch } = useGlobalState();
  const { messageList } = store;
  const [error, setError] = useState(null);
  const location = useLocation(); // current location (/messages/mymessages etc.)
  const params = useParams(); // params from route (:username)

  // console.log('>><<');

  useEffect(() => {
    if (location.pathname === '/messages/mymessages') {
      setError(null);
      getMyMessages() // 2. Fetch messages from API based on queryString (username)
        .then((messages) => {
          dispatch({
            type: 'setMessageList',
            data: messages,
          });
        })
        .catch((err) => console.error(err));
    } else if (params.username) {
      getMessagesByUser(params.username).then((messages) => {
        if (messages.error) {
          setError(messages.error);
        } else {
          setError(null);
          dispatch({
            type: 'setMessageList',
            data: messages,
          });
        }
      });
    } else {
      setError(null);
      console.log('trying to set messages');
      getMessages()
        .then((messages) => {
          dispatch({
            type: 'setMessageList',
            data: messages,
          });
        })
        .catch((err) => console.error(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]); // 3. Fire side effect if query string changes

  console.log(messageList);
  let headers = messageList[0].headers;
  console.log(headers);

  return (
    <>
      {messageList.length > 0 && !error ? (
        messageList.map((message) => (
          <Message key={message.id} message={message} />
        ))
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '150px',
            fontSize: '24px',
            fontWeight: '600',
            color: '#fff',
            background: '#f7ada2',
            borderBottomLeftRadius: '15px',
            borderBottomRightRadius: '15px',
          }}
        >
          No Messages!
        </div>
      )}
    </>
  );
};
