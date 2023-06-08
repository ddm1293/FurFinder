import { Avatar, Card } from 'antd'
import { MessageOutlined, StarOutlined, UserOutlined } from '@ant-design/icons'

const { Meta } = Card

function CardView ({ items }) {
  return (
    <div>
      <div className="card-view">
        {items.map((card, index) => (
          <Card className="cards"
                key={index}
                style={{ width: 400 }}
                cover={<img src={card.img} alt="pet" />}
                actions={[
                  <StarOutlined key="star" />,
                  <MessageOutlined key="message" />,
                ]}
          >
            <Meta
              avatar={<Avatar size={30} icon={<UserOutlined />} />}
              title={<a href="">{card.title}</a>}
              description= {card.description.length>30? card.description.slice(0, 30) + "..." : card.description}
            />
          </Card>
        ))}
      </div>
    </div>
  )
}

export default CardView