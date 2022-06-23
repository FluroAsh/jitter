import { useEffect } from 'react';
import { useGlobalState } from '../utils/stateContext';
import { Message } from './Message';
import { useLocation } from 'react-router-dom';
import { getMessages, getMessagesByUser } from './services/messagesServices';

export const Messages = () => {
  const { store, dispatch } = useGlobalState();
  const { messageList } = store;
  const query = useLocation().search; // 1. Get URL search string (either undefined or ?username=name)

  if (!messageList.length) {
    console.log('All messages');
    getMessages()
      .then((messages) => {
        dispatch({
          type: 'setMessageList',
          data: messages,
        });
      })
      .catch((err) => console.error(err));
  }

  console.log(messageList, 'rendered -> outside effect...', `query: ${query}`);

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
          console.log(messages, 'response -> inside effect');
        })
        .catch((err) => console.error(err));
    }
  }, []); // 3. if Query string changes, re-execute effect

  console.log(
    `MessageList Length > 0?: ${messageList.length > 0}\nMessageList Length: ${
      messageList.length
    }\nQuery string: ${query || 'undefined'}`
  );
  return (
    <>
      {/* messageList.error should be undefined if we return messages from the backend API */}
      {messageList.length > 0 && !messageList.error ? (
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
