import {
  CREATE_THREAD_REQUEST,
  CREATE_THREAD_SUCCESS,
  CREATE_THREAD_FAILURE,
  GET_THREAD_REQUEST,
  GET_THREAD_SUCCESS,
  GET_THREAD_FAILURE,
  UPDATE_THREAD_REQUEST,
  UPDATE_THREAD_SUCCESS,
  UPDATE_THREAD_FAILURE,
  DELETE_THREAD_REQUEST,
  DELETE_THREAD_SUCCESS,
  DELETE_THREAD_FAILURE
} from '../actions/threadActions';

const initialState = {
  loading: false,
  threads: [],
  error: ''
};

const threadReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_THREAD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_THREAD_SUCCESS:
      return {
        loading: false,
        threads: state.threads.concat(action.payload),
        error: '',
      };
    case CREATE_THREAD_FAILURE:
      return {
        loading: false,
        threads: [],
        error: action.payload,
      };
    case GET_THREAD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_THREAD_SUCCESS:
      return {
        loading: false,
        threads: state.threads.map(thread =>
          thread._id === action.payload._id ? action.payload : thread),
        error: '',
      };
    case GET_THREAD_FAILURE:
      return {
        loading: false,
        threads: [],
        error: action.payload,
      };
    case UPDATE_THREAD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_THREAD_SUCCESS:
      return {
        loading: false,
        threads: state.threads.map(thread =>
          thread._id === action.payload._id ? action.payload : thread),
        error: '',
      };
    case UPDATE_THREAD_FAILURE:
      return {
        loading: false,
        threads: [],
        error: action.payload,
      };
    case DELETE_THREAD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_THREAD_SUCCESS:
      return {
        loading: false,
        threads: state.threads.filter(thread => thread._id !== action.payload),
        error: '',
      };
    case DELETE_THREAD_FAILURE:
      return {
        loading: false,
        threads: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default threadReducer();
