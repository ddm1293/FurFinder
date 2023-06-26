import { Avatar, Card } from 'antd'
import { MessageOutlined, StarOutlined, UserOutlined } from '@ant-design/icons'

const { Meta } = Card

function CardView ({ items }) {
  return (
    <div>
      <div className="card-view">
        {items.map((item, index) => (
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
