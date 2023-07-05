import { Avatar, Card } from 'antd'
import { MessageOutlined, StarFilled, StarOutlined, UserOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useSelector } from 'react-redux'
import axios from 'axios'

const { Meta } = Card

function CardView ({ items }) {
  const petAttributes = ['name', 'breed', 'sex'];
  const user = useSelector((state) => state.user);
  const [favourite, setFavorite] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const verifyValidPet = (pet) => {
    for (const key in petAttributes) {
      if (!pet[key]) {
        return false;
      }
    }
    return true;
  }

  useEffect(() => {
    console.log(user);
    axiosPrivate({
      url: `http://localhost:3001/user/me`,
    }).then((response) => {
      console.log(response);
      setFavorite(response.data.user.favoredThreads);
    }).catch((error) => {
      console.log(error)
    })
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
      <div className="card-view">
        {items.map((item, index) => {
          if (!item.archived && item.pet) {
            return (
              <Card className="cards"
                    key={index}
                    style={{ width: 300 }}
                    cover={<img src={item.img} alt="pet" />}
                    actions={[
                      <div onClick={() => {handleClick(item._id)}}>
                        {favourite.includes(item._id) ? <StarFilled key="star" /> : <StarOutlined key="star" />}
                      </div>,
                      <MessageOutlined key="message" />,
                    ]}
              >
                <Meta
                  avatar={<Avatar size={30} icon={<UserOutlined />} />}
                  title={<a href="">{item.title}</a>}
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
