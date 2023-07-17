import '../../style/EditProfile.css'
import EditAvatar from './EditAvatar'

export default function UserProfileView () {

  return (
    <div className="profile">
      <h2>User Profile</h2>
      <EditAvatar />
    </div>
  )
};