import * as api from "../api";
import {COMMENT,FETCH_POST,FETCH_BY_SEARCH,START_LOADING,STOP_LOADING,CREATE,UPDATE,FETCH_ALL,DELETE} from "../actionTypes/index"
//action creators 

export const getPost = (id)  => async (dispatch) => {
    try {
        dispatch({type:START_LOADING});
        const {data} = await api.fetchPost(id);
        console.log(data);
        dispatch({type:FETCH_POST ,payload:data})
        dispatch({type:STOP_LOADING})
    } catch (error) {
        console.log(error)
    }
}

export const getPosts = (page)  => async (dispatch) => {
    try {
        dispatch({type:START_LOADING});
        const {data} = await api.fetchPosts(page);
        console.log(data);
        dispatch({type:FETCH_ALL ,payload:data})
        dispatch({type:STOP_LOADING})
    } catch (error) {
        console.log(error)
    }
}

export const getPostBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({type:START_LOADING});
        const { data : {data} } = await api.fetchPostBySearch(searchQuery);
        console.log(data)
        dispatch({type:FETCH_BY_SEARCH ,payload:data})
        dispatch({type:STOP_LOADING});

    } catch (error) {
        console.log(error);
    }
}

export const createPost = (post,history) => async (dispatch) => {
    try {
        dispatch({type:START_LOADING});
        const {data} = await api.createPost(post);
        console.log("data:",data)
        history(`/posts/${data._id}`)
        dispatch({type:CREATE,payload:data})
        dispatch({type:STOP_LOADING})

    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (id,post) => async(dispatch) =>{
    try {
        const {data} = await api.updatePost(id,post);
        dispatch({type:UPDATE,payload:data});
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = (id) =>async (dispatch) =>{
    try {
        await api.deletePost(id);
        dispatch({type:DELETE,payload:id});
    } catch (error) {
        console.log(error)
    }
} 

export const likePost = (id) => async (dispatch) => {
    try {
        const {data} = await api.likePost(id);
        dispatch({type:UPDATE,payload:data});
    } catch (error) {
        console.log(error)
    }
} 
export const commentPost = (value,id) => async (dispatch) => {
    try {
        const {data} = await api.comment(value,id);
        console.log(data);
        dispatch({type:COMMENT,payload:data});
        return data.comments;
    } catch (error) {
        console.log(error)
        
    }
}