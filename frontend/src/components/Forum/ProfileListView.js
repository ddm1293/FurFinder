import { Divider, List } from 'antd'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { Link } from 'react-router-dom'
import DisplayAvatar from '../User/DisplayAvatar'
import { getApiUrl } from '../../utils/getApiUrl'

function ProfileListView ({ items }) {
  const user = useSelector((state) => state.user);
  const axiosPrivate = useAxiosPrivate();


  useEffect(() => {
    console.log(user);
    axiosPrivate({
      url: getApiUrl(`/user/me`),
    }).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error)
    });
  }, [user])


  return (
    <div>
      <div className="list-view">
        <List
          itemLayout="vertical"
          size="large"
          dataSource={items}
          renderItem={(item, index) => (
            <List.Item className="list-item"
                       key={index}
            >
              <List.Item.Meta
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
            </List.Item>
            )}
        />
        <Divider/>
      </div>
    </div>
  )
}
export default ProfileListView
