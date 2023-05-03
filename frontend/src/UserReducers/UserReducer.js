import {
    login_fail, login_sucess, login_request, register_fail,
    register_request,
    register_sucess,
    getuser_request,
    getuser_sucess,
    getuser_fail,
    logout_request,
    logout_fail,
    logout_sucess,
    allnotes_request,
    allnotes_sucess,
    allnotes_fail,
    deletenote_request,
    deletenote_sucess,
    deletenote_fail,
    addnote_request,
    addnote_sucess,
    addnote_fail,
    update_request,
    update_sucess,
    update_fail
} from '../Constants/Constants'

export const userReducer = (state = { user: {} }, action) => {

    switch (action.type) {
        case login_request:
        case register_request:
        case getuser_request:
        case logout_request:
            return {
                loading: true,
                isAuthenticated: null
            }
        case login_sucess:
        case register_sucess:
        case getuser_sucess:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }

        case logout_sucess:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                message: action.payload
            }
        case login_fail:
        case register_fail:
        case getuser_fail:
        case logout_fail:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }


        default:
            return state;
    }

}

export const noteReducer = (state = { notes: {} }, action) => {

    switch (action.type) {
        case allnotes_request:
        case deletenote_request:
        case addnote_request:
            case update_request:
            return {
                loading: true,
                sucess:false
            }
        case allnotes_sucess:
            return {
                ...state,
                loading: false,
                notes: action.payload,
            }
        case deletenote_sucess:
            case update_sucess:
            return {
                ...state,
                loading: false,
                sucess: true

            }
        case addnote_sucess:
            return {
                ...state,
                loading: false,
                notes:action.payload,
                sucess:true
            }
        case allnotes_fail:
            return {
                ...state,
                loading: false,
                notes: null,
                error: action.payload
            }
        case deletenote_fail:
            case update_fail:
            return {
                ...state,
                loading: false,
                error: action.payload,
                sucess:false
            }
        case addnote_fail:
            return {
                ...state,
                loading: false,
                notes:null,
                error: action.payload,
                sucess:false
            }
        default:
            return state;
    }
}