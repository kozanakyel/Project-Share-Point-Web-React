import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { green } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TextareaAutosize from '@mui/base/TextareaAutosize';

import axios from '../../utils/axios';
import useAuth from './../../utils/useAuth';


import './projectcard.scss';
import { Link } from 'react-router-dom';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ProjectCard(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [text, setText] = React.useState('');

  const [comments, setComments] = React.useState([]);
  const { auth } = useAuth();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  console.log(props.projectId);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(text);

    const headers = {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${auth?.jwToken}`,
      "Accept-Post": "*/*"
    }

    try {
      const response = await axios.post(`/api/Projects/${props.projectId}/comments`,
        JSON.stringify({ text }),
        {
          headers: headers
        }
      );
      console.log(JSON.stringify(response));
      console.log('response data', response);
      console.log('status', response.status, 'typr of', typeof (response.status));
      localStorage.setItem("data", JSON.stringify(response));
      const saved = localStorage.getItem("data");
      console.log('before parsed', saved)
      let savedObject = JSON.parse(saved);
      console.log('saved data after parsed', savedObject.data);
      if (response.status === 200) {
        console.log("basraili comment");
        localStorage.clear();
      } else {

        localStorage.clear();
      }

    } catch (err) {
      if (!err?.response) {

      }

    }
  }

  React.useEffect(() => {
    console.log(text);
  }, [text])

  const headers2 = {
    "Authorization": `Bearer ${auth?.jwToken}`,
    "Accept-Post": "*/*"
  }


  React.useEffect(() => {
    axios.get(`/api/Projects/${props.projectId}/comments`,
      {
        headers: headers2
      })
      .then(function (response) {
        console.log('comments get data ', response);
        
         localStorage.setItem("dataC", JSON.stringify(response?.data));
        const saved = localStorage.getItem("dataC");
        const savedObject = JSON.parse(saved);
        console.log(savedObject);

        setComments(savedObject);
        
      });
  }, [props.projectId])


  return (
    <Card sx={{ marginTop: 3, width: 500, border: 2 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: green[500] }} aria-label="recipe">
            {props.avatar}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.title}
        subheader={props.date}
      />
      <div className='card-content-row'>
        <CardMedia
          component="img"
          height="194"
          image={props.image}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {props.content}
          </Typography>
        </CardContent>
      </div>
      <div className='comment-area'>
        <form onSubmit={handleSubmit} className='comment-area' >
          <TextareaAutosize
            maxRows={4}
            aria-label="maximum height"
            placeholder="Write your comment"
            onChange={(e) => setText(e.target.value)}
            id="text"
            style={{ width: 350 }}
          />
          <button className="w-40 btn btn-sm btn-success mb-3"
            type="submit">Sent</button>
        </form>

      </div>

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">

          <FavoriteIcon />

        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Comments:</Typography>
          <Typography paragraph>
            <p>Admin</p>
            <p>Always enjoy when you write the comment</p>
          </Typography>
          {comments.map((e, i) => {
            return (
              <div key={i}>
                <Typography paragraph>
                  <p className='profile-id'>ID: {e.userProfileId}</p>
                  <p>{e.text}</p>
                </Typography>
              </div>
            );
          })}


        </CardContent>
      </Collapse>
    </Card>
  );
}