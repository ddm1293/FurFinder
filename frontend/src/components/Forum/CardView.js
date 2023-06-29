import { Avatar, Card } from 'antd'
import { MessageOutlined, StarTwoTone, UserOutlined } from '@ant-design/icons'
import { useState } from 'react'
import axios from 'axios'

const { Meta } = Card

function CardView ({ items }, props) {
  const [isActive, setIsActive] = useState(false);
  const [favourite, updateFavorite] = useState([]);

  const handleChange = (event) => {
    console.log(111);
    console.log(event.target.value)
  }

  const handleClick= (id) => {
    // event.preventDefault();
    console.log(id);
    if (isActive) {
      setIsActive(!isActive)
    } else {
      setIsActive(!isActive)
    }
    // axios.patch(`https://localhost:3001/thread/${id}/648259af08b5ed5dfe185599/favorite`)
    //   .then((res) => {
    //     console.log(res)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
  }
  return (
    <div>
      <div className="card-view">
        {items.map((item, index) => (
          <Card className="cards"
                key={index}
                style={{ width: 400 }}
                cover={<img src={item.img} alt="pet" />}
                actions={[
                  // < StarOutlined className="star"  />,
                  <StarTwoTone key = "star"  onClick={handleClick} twoToneColor={isActive? "grey" : "lightgrey" } />,
                  <MessageOutlined key="message" />,
                ]}

          >
            <Meta
              avatar={<Avatar size={30} icon={<UserOutlined />} />}
              title={<a href="">{item.title}</a>}
              description={
                <div>
                  <div className="breed">{`Breed: ${item.breed}`}</div>
                  <div className="sex">{`Sex: ${item.sex}`}</div>
                </div>
              }
            />
          </Card>
        ))}
      </div>
    </div>
  )
}

export default CardView
