import '../../style/EditProfile.css'
import EditAvatar from './EditAvatar'
import EditProfile from './EditProfile'

export default function UserProfileView () {

  return (
    <div className="profile">
      <h2>User Profile</h2>
      <EditAvatar />
      <EditProfile />
    </div>
  )
};