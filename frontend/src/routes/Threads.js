import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Forum from "../components/Forum/Forum";

function Threads() {
  const location = useLocation();
  const user = useSelector((state) => state.user);
  let filterOptions;
  let threadType = 'lostPetThread';

  if (location.state) {
    if (!user.username) {
      return <Navigate to="/login" replace />;
    } else {
      filterOptions = location.state.filterOptions;
      threadType = location.state.threadType;

    }
  } else {
    filterOptions = 'lost';
  }

  return (
    <>
      <Forum
      filterOptions={filterOptions}
      threadType={threadType}
    />
    </>
  );
}

export default Threads;
