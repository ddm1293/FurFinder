import '../../style/EditProfile.css'
import EditAvatar from './EditAvatar'
import EditProfile from './EditProfile'
import Notification from './Notification'

export default function UserProfileView () {

  return (
    <div className="profile">
      <h2>User Profile</h2>
      <EditAvatar />
      <EditProfile />
      <h2>Notification</h2>
      <Notification />
    </div>
  )
};