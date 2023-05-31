
import {
    addnote_fail,
    addnote_request,
    addnote_sucess,
    allnotes_fail,
    allnotes_request,
    allnotes_sucess,
    deletenote_fail,
    deletenote_request,
    deletenote_sucess,
    getuser_fail,
    getuser_request,
    getuser_sucess,
    login_fail,
    login_request,
    login_sucess,
    logout_fail,
    logout_request,
    logout_sucess,
    register_fail,
    register_request,
    register_sucess,
    update_fail,
    update_request,
    update_sucess,
} from "../Constants/Constants";
import axios from 'axios'

const backend_url="https://note-making-app.onrender.com"
// axios.create({
//         // baseURL: process.env.BASE_URL,
//     // baseURL: 'http://localhost:4000',

//     baseURL: "https://note-making-app.onrender.com",
//     withCredentials: true
// })



export const register = (name, email, password, cpassword) => async (dispatch) => {
    try {

        dispatch({ type: register_request });
        // const config = { headers: {"Content-Type": "application/json"}};
        const { data } = await axios.post(`${backend_url}/api/v1/register`,
            { name, email, password, cpassword }
        );

        dispatch({ type: register_sucess, payload: data.user });

    } catch (error) {

        dispatch({ type: register_fail, payload: error.response.data.message })

    }
}

export const login = (email, password) => async (dispatch) => {
    try {

        dispatch({ type: login_request });
        // const config = { headers: {"Content-Type": "application/json"}};

        const { data } = await axios.post(`${backend_url}/api/v1/login`,
            { email, password }
        );

        dispatch({ type: login_sucess, payload: data.token });

    } catch (error) {
        dispatch({ type: login_fail, payload: error.response.data.message })

    }

}


export const Logout = () => async (dispatch) => {
    try {
        dispatch({ type: logout_request });

        const { data } = await axios.get(`${backend_url}/api/v1/logout`)
        dispatch({ type: logout_sucess, payload: data.message });

    } catch (error) {
        dispatch({ type: logout_fail, payload: error.response.data.message });

    }

}

export const getUser = () => async (dispatch) => {
    try {
        dispatch({ type: getuser_request });

        const { data } = await axios.post(`${backend_url}/api/v1/me`
        
        )

        dispatch({ type: getuser_sucess, payload: data.user });

    } catch (error) {
        dispatch({ type: getuser_fail, payload: error.response.data.message });

    }

}

export const getAllnotes = () => async (dispatch) => {
    try {
        dispatch({ type: allnotes_request });

        const { data } = await axios.get(`${backend_url}/api/v1/fetchallnotes`)
        dispatch({ type: allnotes_sucess, payload: data.notes });

    } catch (error) {
        dispatch({ type: allnotes_fail, payload: error.response.data.message });

    }
}

export const deletenote = (id) => async (dispatch) => {
    try {
        dispatch({ type: deletenote_request });

        const { data } = await axios.delete(`${backend_url}/api/v1/deletenote/${id}`)
        dispatch({ type: deletenote_sucess, payload: data.sucess });

    } catch (error) {
        dispatch({ type: deletenote_fail, payload: error.response.data.message });

    }
}

export const addnote = (title, description) => async (dispatch) => {
    try {

        dispatch({ type: addnote_request });
        // const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.post(`${backend_url}/api/v1/createnote`,
            { title, description }
        )
        dispatch({ type: addnote_sucess, payload: data.notes });

    } catch (error) {
        dispatch({ type: addnote_fail, payload: error.response.data.message });

    }
}

export const updatenote = (id, title, description) => async (dispatch) => {
    try {

        dispatch({ type: update_request });
        // const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.put(`${backend_url}/api/v1/updatenote/${id}`,
            { title, description }
        )
        dispatch({ type: update_sucess, payload: data.notes });

    } catch (error) {
        dispatch({ type: update_fail, payload: error.response.data.message });

    }
}