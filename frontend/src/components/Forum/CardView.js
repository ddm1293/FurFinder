import { Avatar, Card } from 'antd'
import { ExpandOutlined, StarOutlined } from '@ant-design/icons'

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
                  <ExpandOutlined key="expand" />
                ]}
          >
            <Meta
              avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
              title={card.title}
              description={card.description}
            />
          </Card>
        ))}
      </div>
    </div>
  )
}

export default CardView