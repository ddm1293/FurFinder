import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setAccessToken } from '../store/userSlice';
import { getApiUrl } from '../utils/getApiUrl'

// sets accessToken in case it has expired
const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refresh = async () => {
    const response = await axios.get(getApiUrl('/auth/refresh'), { // TODO: better handling of url
      withCredentials: true
    });

    dispatch(setAccessToken(response.data.accessToken));
    return response.data.accessToken;
  }

  return refresh;
};

export default useRefreshToken;
