import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import '../style/YourProfile.css';
import UserProfileView from '../components/User/UserProfileView'
import MyThreadListing from '../components/User/MyThreadListing'
import FavoriteThread from '../components/User/FavoriteThread'

export default function YourProfile() {
  const user = useSelector((state) => state.user);
  const axiosPrivate = useAxiosPrivate();

  const test = () => {
    if (user.username) {
      setTimeout(async () => {
        const res = await axiosPrivate({
          url: `/user/me`,
        });
        const res2 = await axios.get(`http://localhost:3001/user/64823ca71623f19e8667501e`);
        console.log(res.data);
        console.log(res2.data);
      }, 1000); // make it larger to refresh auth token
    }
  }

  useEffect(() => {
    test();
  }, []);



  return (
    <div id="your-profile">
      <h1>Hello, {user.username}</h1>
      <p>ID: {user.id}</p>
      <UserProfileView />
      <h2>Post History</h2>
      <MyThreadListing />
      <FavoriteThread />
      {/* <p>My threads: {user.myThreads}</p> */}
      {/* <p>My favourites: {user.favoredThreads}</p> */}
      {/* <p>Access token: {'...' + user.accessToken.split('.')[2]}</p> */}
      {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> */}
    </div>
  );
};
