import { Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const Message = ({ message }) => {
  return (
    // absolute path
    <Link to={`/messages/${message.id}`} style={{ textDecoration: 'none' }}>
      <Card style={{ margin: '1em 0', background: '#2255ff30' }}>
        <CardContent style={{ padding: '1em' }}>
          <Link to={`/messages/user/${message.username}`}>
            <Typography variant="h5">{message.username}</Typography>
          </Link>
          <Typography variant="p">{message.text}</Typography>
          <br />
          <Typography variant="p">{message.posted}</Typography>
          {/* uses the relative path (localhost:3001/messages) */}
        </CardContent>
      </Card>
    </Link>
  );
};
