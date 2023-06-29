import { Avatar, Card } from 'antd'
import { MessageOutlined, StarOutlined, UserOutlined } from '@ant-design/icons'

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
