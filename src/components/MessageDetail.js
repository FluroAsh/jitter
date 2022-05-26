import { useParams, Link } from 'react-router-dom';

export const MessageDetail = ({ messageList }) => {
  const params = useParams();
  console.log(params);

  const getMessage = (id) => {
    return messageList.find((m) => m.id === parseInt(id));
  };

  // find the message by invoking getMessage fn
  const message = getMessage(params.messageId); //{ text: 'Test message', user: 'Test user' };

  return (
    <>
      {message ? (
        <>
          <h4>{message.user}</h4>
          <p>{message.text}</p>
        </>
      ) : (
        <Link to="messages">Go back to home page</Link>
      )}
    </>
  );
};
