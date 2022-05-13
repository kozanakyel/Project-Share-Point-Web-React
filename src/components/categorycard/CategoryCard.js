import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', color:'orange', mx: '12px', transform: 'scale(0.8)'}}
  >
    Biology
  </Box>
);

const listColor = [
    "#D65076",
    "#EFC050",
    "#C3447A",
    "#BC243C"
]

const card = (
  <React.Fragment>
    <CardContent sx={{  }}>
      <Typography variant="h5" color="text.secondary" gutterBottom>
       {bull}
      </Typography>
      <Typography variant="p" component="div">
        All the new and Exiting Biology related projects
      </Typography>
      
    </CardContent>
    <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions>
  </React.Fragment>
);

export default function CategoryCard() {
  return (
    <Box sx={{ width: 150, margin:2 }}>
      <Card className='bg-dark text-success' variant="outlined">{card}</Card>
    </Box>
  );
}