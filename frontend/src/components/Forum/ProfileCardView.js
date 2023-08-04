import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import {  Card } from 'antd';
import icon from "../../static/icon.png";
import DisplayAvatar from '../User/DisplayAvatar'

const { Meta } = Card

function ProfileCardView ({ items }) {
  const user = useSelector((state) => state.user);
  const [favourite, setFavorite] = useState([]);
  const axiosPrivate = useAxiosPrivate();


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

export default ProfileCardView
