import { List } from 'antd';
import { MessageOutlined, StarFilled, StarOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { Link, useNavigate } from 'react-router-dom'
import DisplayAvatar from '../User/DisplayAvatar'
import { getApiUrl } from '../../utils/getApiUrl'

function ListView ({ items }) {
  const user = useSelector((state) => state.user);
  const [favourite, setFavorite] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  useEffect(() => {
    axiosPrivate({
      url: getApiUrl(`/user/me`),
    }).then((response) => {
      setFavorite(response.data.user.favoredThreads);
    }).catch((error) => {
      console.log('Cannot get user favorite on list view' + error);
    });
  }, [user])

  const handleClick= (id) => {
    if (!user.username){
      navigate('/login');
      return;
    }
    axios
      .patch(getApiUrl(`/thread/${id}/${user.id}/favorite`))
      .then(() => {
        const updatedFavourite = favourite.includes(id)
          ? favourite.filter((itemId) => itemId !== id)
          : [...favourite, id];
        setFavorite(updatedFavourite);
      })
      .catch((error) => {
        console.log('Cannot update user favorite on card view' + error);
      })
  }
  return (
    <div>
      <div className="list-view">
      <List
        itemLayout="vertical"
        size="large"
        dataSource={items}
        renderItem={(item, index) => (
          <List.Item className="list-item"
                     key={index}
                     actions={[
                       <div onClick={() => {handleClick(item._id)}}>
                         {favourite.includes(item._id) ? <StarFilled key="star" /> : <StarOutlined key="star" />}
                       </div>,
                       <div key="message-action">
                         <Link to={`/threads/${item._id}`}>
                           <MessageOutlined key="message" />
                         </Link>
                       </div>,
                     ]}
          >
            <List.Item.Meta
              avatar={<DisplayAvatar currentUser={item.poster}/>}
              title={<Link to={`/threads/${item._id}`}>{item.title}</Link>}
              // title={<a href="">{item.title}</a>} // TODO: add link to thread
              description={
                <div>
                  <div className="name">{`Name: ${item.pet.name}`}</div>
                  <div className="breed">{`Breed: ${item.pet.breed}`}</div>
                  <div className="sex">{`Sex: ${item.pet.sex}`}</div>
                </div>
              }
            />
          </List.Item>
        )}
      />
      </div>
    </div>
  )
}
export default ListView
