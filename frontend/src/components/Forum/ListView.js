import { List } from 'antd'
import { Avatar } from 'antd'
import { MessageOutlined, StarOutlined, StarTwoTone, UserOutlined } from '@ant-design/icons'
import { useState } from 'react'

function ListView ({ items }) {
  const [isActive, setIsActive] = useState(false);
  const [favourite, updateFavorite] = useState([]);

  const handleClick= (event) => {
    if (isActive) {
      setIsActive(!isActive)
    } else {
      setIsActive(!isActive)
    }
  }
  return (
    <div>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={items}
        renderItem={(item, index) => (
          <List.Item className="list-item"
                     key={index}
                     actions={[
                       // <StarOutlined key="star" />,
                       <StarTwoTone key = "star"  onClick={handleClick} twoToneColor={isActive? "grey" : "lightgrey" } />,
                       <MessageOutlined key="message" />
                     ]}
          >
            <List.Item.Meta
              avatar={<Avatar size={30} icon={<UserOutlined />} />}
              title={<a href="">{item.title}</a>} // TODO: add link to thread
              description={
                <div>
                  <div className="name">{`Name: ${item.pet.name}`}</div>
                  <div className="breed">{`Breed: ${item.pet.breed}`}</div>
                  <div className="sex">{`Sex: ${item.pet.sex}`}</div>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </div>
  )
}
export default ListView
