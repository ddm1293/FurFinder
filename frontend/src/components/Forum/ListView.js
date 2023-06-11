import { List } from 'antd'
import { Avatar } from 'antd'
import { MessageOutlined, StarOutlined, UserOutlined } from '@ant-design/icons'

function ListView ({ items }) {
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
                       <StarOutlined key="star" />,
                       <MessageOutlined key="message" />
                     ]}
          >
            <List.Item.Meta
              avatar={<Avatar size={30} icon={<UserOutlined />} />}
              title={<a href="">{item.title}</a>} // TODO: add link to thread
              description={
                <div>
                  <div className="breed">{`Breed: ${item.breed}`}</div>
                  <div className="sex">{`Sex: ${item.sex}`}</div>
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
