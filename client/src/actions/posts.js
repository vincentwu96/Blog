import * as api from '../api';

// Action Creators
// redux-thunk to delay evaluation to get all the posts => async(dispatch)
export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        dispatch({
            type: 'FETCH_ALL',
            payload: data
        });
    } catch (error) {
        console.log(error.message);
    }
}