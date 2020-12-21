import { LOGIN, LOGOUT, COURSE_SEL, VIDEO_SEL } from '../actions/user.actions';
const initialState = {
    userkey: '',
    email: '',
    password: '',
    username: '',
    lastest_date: '',
    loggedIn: false,
    paidState: false,
    photo_url: '',
    ca_key1: '',
    ca_key2: '',
    co_key1: '',
    co_key2: '',
    v_key1:'',
    v_key2:'',
};
const countReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                userkey: action.userkey,
                email: action.email,
                password: action.password,
                username: action.username,
                loggedIn: true,
                paidState: action.paidState,
                lastest_date: action.lastest_date,
                photo_url: action.photo_url,
                ca_key1: action.ca_key1,
                ca_key2: action.ca_key2,
                co_key1: action.co_key1,
                co_key2: action.co_key2,
                v_key1: action.v_key1,
                v_key2: action.v_key2,
            };

        case LOGOUT:
            return {
                ...state,
                userkey: '',
                email: '',
                password: '',
                username: '',
                loggedIn: false,
                paidState: false,
                co_key1: '',
                co_key2: '',
                ca_key1: '',
                ca_key2: '',
                v_key1:'',
                v_key2:'',
            };
        case COURSE_SEL:
            return {
                ...state,
                ca_key1: action.ca_key1,
                ca_key2: action.ca_key2,
                co_key1: action.co_key1,
                co_key2: action.co_key2,   
            }
        case VIDEO_SEL:
            return {
                ...state,
                v_key1: action.v_key1,
                v_key2: action.v_key2,
            }
        default:
            return state;
    }
}
export default countReducer;