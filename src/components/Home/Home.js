import React, { useEffect, useState }  from 'react'
import {Container, Grow, Grid, Paper,AppBar,TextField,Button} from '@material-ui/core';
import Form from '../Form/Form';
import Posts from '../Posts/Posts';
import useStyles from "./styles";
import { getPostBySearch, getPosts } from '../../actions/posts';
import { useDispatch } from "react-redux";
import { useLocation,useNavigate } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import { fetchPostBySearch } from '../../api';
import Paginate from '../Posts/Pagination';


function useQuery(){
    return new URLSearchParams(useLocation().search);
}
const Home = () => {


    const classes = useStyles();

    const dispatch = useDispatch();
    const [CurrentId,setCurrentId] = useState(null);
    const query = useQuery();
    const history = useNavigate();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery')
    const [search,setSearch] = useState('')
    const [tags,setTags] = useState([])

    console.log(searchQuery)
    
    useEffect(()=>{
        dispatch(getPosts());
    },[CurrentId,dispatch]);
   
    const handleKeyPress = (e) => {
        if(e.KeyCode === 13 ){
        searchPost()    
        }
    }

    const searchPost = () => {
        if(search.trim() || tags){
            dispatch(getPostBySearch({search,tags: tags.join(',')}));
            history(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        }else{
            history('/')
        }
    }

    const handleAdd = (tag) => setTags([...tags,tag])
    const handleDelete = (tagToDelete) => setTags(tags.filter((tag)=>tag !== tagToDelete)); 
  return (
    <Grow in>
            <Container maxWidth="xl">
                <Grid className={classes.gridcontainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={6} md={9} >
            <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={6} md={3} >
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
                <TextField
                name="search"
                variant='outlined'
                label="search memories"
                fullWidth
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                onKeyPress={handleKeyPress}
                />
    <ChipInput 
    style={{margin:"10px 0"}}
    value={tags}
    onAdd={handleAdd}
    onDelete={handleDelete}
    label="Search Tags"
    variant='outlined'
    />
    <Button onClick={searchPost} variant="contained" className={classes.searchButton} color="primary">
        search
    </Button>
            </AppBar>
             <Form CurrentId={CurrentId} setCurrentId={setCurrentId} />
             {(!searchQuery && !tags.length) && (
                <Paper className={classes.pagination} elevation={6} >
                 <Paginate page={page}/>
             </Paper>
             )}   
             
            </Grid>
                </Grid>
            </Container>
        </Grow>
  )
}

export default Home