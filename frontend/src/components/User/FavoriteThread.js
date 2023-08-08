import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { fetchPetFromThread } from '../../thunk/thunkHelper'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { StarOutlined } from '@ant-design/icons'
import { Divider } from 'antd'
import ProfileListView from '../Forum/ProfileListView'
import { getApiUrl } from '../../utils/getApiUrl'

function FavoriteThread () {
  const user = useSelector((state) => state.user);
  const [favourite, setFavorite] = useState([]);
  const axiosPrivate = useAxiosPrivate();


  useEffect(() => {
    if (user.username) {
      axiosPrivate({
        url: getApiUrl(`/user/me`),
      }).then((response) => {
        console.log(response, 21);
        setFavorite(response.data.user.favoredThreads);
      }).catch((error) => {
        console.log(error)
      });
    }
  }, [user])

  const myThread= favourite;
  const [pet, setPet] = useState([]);

  const fetchThreads = async () => {
    try {
      const res = await Promise.all(myThread.map(id => axios.get(getApiUrl(`/thread/${id}`))));
      const threads = res.map(res => res.data.thread);
      const updated = await fetchPetFromThread(threads);
      const petsData = await Promise.all(updated);
      setPet(petsData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchThreads()
      .catch(error => {
        console.error('Error while fetching threads:', error);
      });
  }, [myThread] );

  return (
    <div>
      <h2><StarOutlined style={{ marginRight: '10px'}}/>Favourite</h2>
      <Divider/>
      <ProfileListView items={pet} />
    </div>
  )
}

export default FavoriteThread;
