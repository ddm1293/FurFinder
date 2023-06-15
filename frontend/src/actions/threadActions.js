import axios from 'axios';


export const CREATE_THREAD_REQUEST = 'CREATE_THREAD_REQUEST';
export const CREATE_THREAD_SUCCESS = 'CREATE_THREAD_SUCCESS';
export const CREATE_THREAD_FAILURE = 'CREATE_THREAD_FAILURE';

export const GET_THREAD_REQUEST = 'GET_THREAD_REQUEST';
export const GET_THREAD_SUCCESS = 'GET_THREAD_SUCCESS';
export const GET_THREAD_FAILURE = 'GET_THREAD_FAILURE';

export const UPDATE_THREAD_REQUEST = 'UPDATE_THREAD_REQUEST';
export const UPDATE_THREAD_SUCCESS = 'UPDATE_THREAD_SUCCESS';
export const UPDATE_THREAD_FAILURE = 'UPDATE_THREAD_FAILURE';

export const DELETE_THREAD_REQUEST = 'DELETE_THREAD_REQUEST';
export const DELETE_THREAD_SUCCESS = 'DELETE_THREAD_SUCCESS';
export const DELETE_THREAD_FAILURE = 'DELETE_THREAD_FAILURE';

export const createThread = (threadData) => {
  return (dispatch) => {
    dispatch(createThreadRequest());
    console.log(threadData);
    // note that axios.post returns a promise
    return axios.post('http://localhost:3001/thread', threadData)
      .then(response => {
        const thread = response.data;
        console.log(thread);
        dispatch(createThreadSuccess(thread));
        return response;
      })
      .catch(error => {
        dispatch(createThreadFailure(error.message));
        throw error; // you should also throw the error to make the promise reject when there's an error
      });
  };
};

export const getThread = (threadId) => {
  return (dispatch) => {
    dispatch(getThreadRequest());
    axios.get(`/api/threads/${threadId}`)
      .then(response => {
        const thread = response.data;
        dispatch(getThreadSuccess(thread));
      })
      .catch(error => {
        dispatch(getThreadFailure(error.message));
      });
  };
};

export const updateThread = (threadId, threadData) => {
  return (dispatch) => {
    dispatch(updateThreadRequest());
    axios.put(`/api/threads/${threadId}`, threadData)
      .then(response => {
        const thread = response.data;
        dispatch(updateThreadSuccess(thread));
      })
      .catch(error => {
        dispatch(updateThreadFailure(error.message));
      });
  };
};

export const deleteThread = (threadId) => {
  return (dispatch) => {
    dispatch(deleteThreadRequest());
    axios.delete(`/api/threads/${threadId}`)
      .then(response => {
        dispatch(deleteThreadSuccess(threadId));
      })
      .catch(error => {
        dispatch(deleteThreadFailure(error.message));
      });
  };
};

export const createThreadRequest = () => {
  return {
    type: CREATE_THREAD_REQUEST
  }
}

export const createThreadSuccess = (thread) => {
  return {
    type: CREATE_THREAD_SUCCESS,
    payload: thread
  }
}

export const createThreadFailure = (error) => {
  return {
    type: CREATE_THREAD_FAILURE,
    payload: error
  }
}

export const getThreadRequest = () => {
  return {
    type: GET_THREAD_REQUEST
  }
}

export const getThreadSuccess = (thread) => {
  return {
    type: GET_THREAD_SUCCESS,
    payload: thread
  }
}

export const getThreadFailure = (error) => {
  return {
    type: GET_THREAD_FAILURE,
    payload: error
  }
}

export const updateThreadRequest = () => {
  return {
    type: UPDATE_THREAD_REQUEST
  }
}

export const updateThreadSuccess = (thread) => {
  return {
    type: UPDATE_THREAD_SUCCESS,
    payload: thread
  }
}

export const updateThreadFailure = (error) => {
  return {
    type: UPDATE_THREAD_FAILURE,
    payload: error
  }
}

export const deleteThreadRequest = () => {
  return {
    type: DELETE_THREAD_REQUEST
  }
}

export const deleteThreadSuccess = (threadId) => {
  return {
    type: DELETE_THREAD_SUCCESS,
    payload: threadId
  }
}

export const deleteThreadFailure = (error) => {
  return {
    type: DELETE_THREAD_FAILURE,
    payload: error
  }
}
