import { Avatar, Card } from 'antd'
import { MessageOutlined, StarOutlined, UserOutlined } from '@ant-design/icons'
import icon from "../../static/icon.png";

const { Meta } = Card

function CardView ({ items }) {
  const petAttributes = ['name', 'breed', 'sex'];
  const verifyValidPet = (pet) => {
    for (const key in petAttributes) {
      if (!pet[key]) {
        return false;
      }
    }
    return true;
  }

  function getItemImgUrl(item) {
    return `http://localhost:3001/pet/${item.pet._id}/image`;
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
                    cover={<img src={getItemImgUrl(item)} alt="pet" onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = icon;
                    }}/>}
                    actions={[
                      <StarOutlined key="star" />,
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
