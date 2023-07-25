import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { Avatar, Card } from 'antd';
import { MessageOutlined, StarFilled, StarOutlined, UserOutlined } from '@ant-design/icons';
import icon from "../../static/icon.png";
import DisplayAvatar from '../User/DisplayAvatar'

const { Meta } = Card

function CardView ({ items }) {
  const user = useSelector((state) => state.user);
  const petAttributes = ['name', 'breed', 'sex'];
  const [favourite, setFavorite] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const verifyValidPet = (pet) => {
    for (const key in petAttributes) {
      if (!pet[key]) {
        return false;
      }
    }
    return true;
  }

  const handleClick= (id) => {
    console.log(id);
    if (!user.username){
      navigate('/login');
      return;
    }
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

  function getItemImgUrl(item) {
    return `http://localhost:3001/pet/${item.pet._id}/image`;
  }

  useEffect(() => {
    if (user.username) { // if username property is filled, then so should the remaining fields of user object
      axiosPrivate({
        url: `http://localhost:3001/user/me`,
      }).then((response) => {
        console.log(response);
        setFavorite(response.data.user.favoredThreads);
      }).catch((error) => {
        console.log(error)
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
                    cover={<img src={getItemImgUrl(item)} alt="pet" onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = icon;
                    }}/>}
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
