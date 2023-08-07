import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { fetchPetFromThread } from '../../thunk/thunkHelper'
import { HistoryOutlined } from '@ant-design/icons'
import { Divider } from 'antd'
import ProfileListView from '../Forum/ProfileListView'

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
      .catch(error => {
        console.error('Error while fetching threads:', error);
      });
  },  [user]);

  const myThread= threads;
  const [pets, setPets] = useState([]);

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
      .catch(error => {
        console.error('Error while fetching threads:', error);
      });
  },  [myThread]);



  return (
    <div>
      <h2><HistoryOutlined style={{ marginRight: '10px'}}/>Post History</h2>
      <Divider/>
      <ProfileListView items={pets} />

    </div>
  )
}

export default MyThreadListing;

