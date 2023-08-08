import { useDispatch } from 'react-redux'
import axios from 'axios'
import { setAccessToken } from '../store/userSlice'
import { getApiUrl } from '../utils/getApiUrl'

const useRefreshToken = () => {
  const dispatch = useDispatch();

  return async () => {
    const response = await axios.get(getApiUrl('/auth/refresh'), { // TODO: better handling of url
      withCredentials: true
    });

    dispatch(setAccessToken(response.data.accessToken));
    return response.data.accessToken;
  };
};

export default useRefreshToken;
