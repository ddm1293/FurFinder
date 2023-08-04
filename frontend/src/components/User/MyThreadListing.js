import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { fetchPetFromThread } from '../../thunk/thunkHelper'
import ProfileCardView from '../Forum/ProfileCardView'

function MyThreadListing () {
  const user = useSelector((state) => state.user);
  const [threads, setThreads] = useState([]);

  const fetchUserThreads = async () => {
    try {
      const response = await axios.get(`thread/userId/${user.id}`);
      setThreads(response.data.threads);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserThreads()
      .then(() => setLoading(false))
      .catch(error => {
        console.error('Error while fetching threads:', error);
        setLoading(false);
      });
  },  [user]);

  const myThread= threads;
  const [pets, setPets] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fetchThreads = async () => {
    try {
      const response = await Promise.all(myThread.map(id => axios.get(`/thread/${id}`)));
      const threads = response.map(res => res.data.thread);
      const updated = await fetchPetFromThread(threads);
      const petsData = await Promise.all(updated);
      setPets(petsData);
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
  },  [myThread]);



  return (
    <div className="profile">
      <h2>My Thread Listing</h2>
      <ProfileCardView items={pets} />

    </div>
  )
}

export default MyThreadListing;

