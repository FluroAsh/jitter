import { Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const Message = ({ message }) => {
  return (
    <Link to={`${message.id}`} style={{ textDecoration: 'none' }}>
      <Card style={{ margin: '1em 0', background: '#2255ff30' }}>
        <CardContent style={{ padding: '1em' }}>
          <Typography variant="h5">{message.user}</Typography>
          <Typography variant="p">{message.text}</Typography>
          <br />
          <Typography variant="p">{message.posted}</Typography>
          {/* uses the relative path (localhost:3001/messages) */}
        </CardContent>
      </Card>
    </Link>
  );
};
