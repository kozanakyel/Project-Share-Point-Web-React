import * as React from 'react';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { Link } from 'react-router-dom';



export default function CategoryCard(props) {
  return (
    <Box className='bg-dark shadow bg-white rounded hover-overlay' sx={{ width: 150, margin: 2 }}>
      <CardContent sx={{}}>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          <Box
            component="span"
            style={{ display: 'inline-block', color: 'orange', mx: '12px', transform: 'scale(0.8)' }}
          >
            {props.name}
          </Box>
        </Typography>
        <Typography variant="p" component="div">
        {props.content}
        </Typography>

      </CardContent>
      <CardActions>
        <Button size="small"><Link to='/login'>Learn More</Link></Button>
      </CardActions>
    </Box>
  );
}