import { useParams, Link } from 'react-router-dom';
import { useGlobalState } from '../utils/stateContext';
import { Card, CardContent, Typography } from '@mui/material';

export const MessageDetail = () => {
  const { store } = useGlobalState();
  const { messageList } = store;
  const params = useParams();

  const getMessage = (id) => {
    return messageList.find((m) => m.id === parseInt(id));
  };

  // find the message by invoking getMessage fn
  const message = getMessage(params.messageId); //{ text: 'Test message', user: 'Test user' };

  return (
    <>
      {message ? (
        <Card>
          <CardContent>
            <Typography variant="h5">{message.text}</Typography>
            <Typography variant="p">{message.username}</Typography>
            <Typography variant="p">{message.posted}</Typography>
          </CardContent>
        </Card>
      ) : (
        <>
          <p>Message not found</p>
          <Link to="/messages">Go back to the main page</Link>
        </>
      )}
    </>
  );
};
