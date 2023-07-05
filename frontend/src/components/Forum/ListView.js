import { List } from 'antd';
import { Avatar } from 'antd';
import { MessageOutlined, StarFilled, StarOutlined, UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

function ListView ({ items }) {
  const user = useSelector((state) => state.user);
  const [favourite, setFavorite] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    console.log(user);
    axiosPrivate({
      url: `http://localhost:3001/user/me`,
    }).then((response) => {
      console.log(response);
      setFavorite(response.data.user.favoredThreads);
    }).catch((error) => {
      console.log(error)
    });
  }, [user])

  const handleClick= (id) => {
    console.log(id);
    axios
      .patch(`http://localhost:3001/thread/${id}/${user.id}/favorite`)
      .then((response) => {
        const updatedFavourite = favourite.includes(id)
          ? favourite.filter((itemId) => itemId !== id)
          : [...favourite, id];
        console.log(updatedFavourite);
        setFavorite(updatedFavourite);
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <div>
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
                       <MessageOutlined key="message" />,
                     ]}
          >
            <List.Item.Meta
              avatar={<Avatar size={30} icon={<UserOutlined />} />}
              title={<a href="">{item.title}</a>} // TODO: add link to thread
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
  )
}
export default ListView
