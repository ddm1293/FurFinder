import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { fetchPetFromThread } from '../../thunk/thunkHelper'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import ProfileCardView from '../Forum/ProfileCardView'

function FavoriteThread () {
  const user = useSelector((state) => state.user);
  const [favourite, setFavorite] = useState([]);
  const axiosPrivate = useAxiosPrivate();


  useEffect(() => {
    if (user.username) { // if username property is filled, then so should the remaining fields of user object
      axiosPrivate({
        url: `/user/me`,
      }).then((response) => {
        console.log(response);
        setFavorite(response.data.user.favoredThreads);
      }).catch((error) => {
        console.log(error)
      });
    }
  }, [user])

  const myThread= favourite;
  const [pet, setPet] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fetchThreads = async () => {
    try {
      const res = await Promise.all(myThread.map(id => axios.get(`/thread/${id}`)));
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
      .then(() => setLoading(false))
      .catch(error => {
        console.error('Error while fetching threads:', error);
        setLoading(false);
      });
  }, [myThread] );

  return (
    <div className="profile">
      <h2>Favorite Thread</h2>
      <ProfileCardView items={pet} />

    </div>
  )
}

export default FavoriteThread;