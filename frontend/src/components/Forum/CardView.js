import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { Card } from 'antd';
import { MessageOutlined, StarFilled, StarOutlined } from '@ant-design/icons';
import icon from "../../static/icon.png";
import DisplayAvatar from '../User/DisplayAvatar'
import { getApiUrl } from '../../utils/getApiUrl'

const { Meta } = Card

function CardView ({ items }) {
  const user = useSelector((state) => state.user);
  const [favourite, setFavorite] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

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

  function getItemImgUrl(item) {
    return getApiUrl(`/pet/${item.pet._id}/coverImage`);
  }

  useEffect(() => {
    if (user.username) {
      axiosPrivate({
        url: getApiUrl(`/user/me`),
      }).then((response) => {
        setFavorite(response.data.user.favoredThreads);
      }).catch((error) => {
        console.log('Cannot get user favorite on card view' + error);
      });
    }
  }, [user])

  return (
    <div>
      <div className="card-view">
        {items.map((item, index) => {
          if (!item.archived && item.pet) {
            return (
              <Card className="cards"
                    key={index}
                    style={{ width: 300 }}
                    cover={
                    <div className="card-cover-container">
                      <img className="card-view-img" src={getItemImgUrl(item)} alt="pet" onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = icon;
                      }}/>
                    </div>}
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
                <Meta
                  avatar={<DisplayAvatar currentUser={item.poster}/>}
                  title={<Link to={`/threads/${item._id}`}>{item.title}</Link>}
                  description={
                    <div>
                      <div className="name">{`Name: ${item.pet.name}`}</div>
                      <div className="breed">{`Breed: ${item.pet.breed}`}</div>
                      <div className="sex">{`Sex: ${item.pet.sex}`}</div>
                    </div>
                  }
                />
              </Card>
            )
          }}
        )}
      </div>
    </div>
  )
}

export default CardView
