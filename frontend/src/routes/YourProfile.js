import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import '../style/YourProfile.css';

export default function YourProfile() {
  const user = useSelector((state) => state.user);
  const axiosPrivate = useAxiosPrivate();

  const test = () => {
    if (user.username) {
      setTimeout(async () => {
        const res = await axiosPrivate({
          url: `/user/${user.id}`,
        });
        console.log(res.data);
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
      <h2>Post History</h2>
      <p>My threads: {user.myThreads}</p>
      <p>My favourites: {user.favoredThreads}</p>
      <p>Access token: {'...' + user.accessToken.split('.')[2]}</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </div>
  );
};
