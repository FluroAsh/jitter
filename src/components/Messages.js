import { useEffect } from 'react';
import { useGlobalState } from '../utils/stateContext';
import { Message } from './Message';
import { useLocation } from 'react-router-dom';
import { getMessagesByUser, getMessages } from './services/messagesServices';

export const Messages = () => {
  const { store, dispatch } = useGlobalState();
  const { messageList } = store;

  // if useLocation().search is true, then set new messageList based on username
  // if user doesn't exist (messageList = null) then render some text "No user found!"
  let query = useLocation().search;

  useEffect(() => {
    if (query) {
      let idx = query.lastIndexOf('=');
      let username = query.slice(idx + 1);
      getMessagesByUser(username)
        .then((messages) =>
          dispatch({
            type: 'setMessageList',
            data: messages,
          })
        )
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
  }, [query]);

  console.log(messageList.length > 0, messageList.length, query);

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