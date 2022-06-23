import { useEffect } from 'react';
import { useGlobalState } from '../utils/stateContext';
import { Message } from './Message';
import { useLocation } from 'react-router-dom';
import { getMessages, getMessagesByUser } from './services/messagesServices';

export const Messages = () => {
  const { store, dispatch } = useGlobalState();
  const { messageList } = store;

  console.log('Rerendering page');
  const query = useLocation().search; // 1. Get URL search string (either undefined or ?username=name)

  useEffect(() => {
    if (query) {
      // if query string is present...
      let idx = query.lastIndexOf('=');
      let username = query.slice(idx + 1);

      getMessagesByUser(username) // 2. Fetch messages from API based on queryString (username)
        .then((messages) => {
          dispatch({
            type: 'setMessageList',
            data: messages,
          });
        })
        .catch((err) => console.error(err));
    } else {
      getMessages()
        .then((messages) => {
          dispatch({
            type: 'setMessageList',
            data: messages,
          });
        })
        .catch((err) => console.error(err));
    }
  }, [query]); // 3. Fire side effect if query string changes

  return (
    <>
      {messageList.length > 0 ? (
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
