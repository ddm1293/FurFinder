import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Forum from "../components/Forum/Forum";

function Threads() {
  const location = useLocation();
  const user = useSelector((state) => state.user);
  let filterOptions;
  let shouldOpenCreateThreadForm;
  let threadType = 'lostPetThread'; // set default type when user enters "/threads" from nav bar

  if (location.state) { // if user clicks on "Lost Pets" or "Witnesses"
    if (location.state.shouldOpenCreateThreadForm && !user.username) {
      return <Navigate to="/login" replace />;
    } else {
      filterOptions = location.state.filterOptions;
      shouldOpenCreateThreadForm = location.state.shouldOpenCreateThreadForm;
      threadType = location.state.threadType;
    }
  } else { // otherwise, when user enters "/threads" into the nav bar
    filterOptions = 'lost';
    shouldOpenCreateThreadForm = false;
  }

  return (
    <Forum
      filterOptions={filterOptions}
      shouldOpenCreateThreadForm={shouldOpenCreateThreadForm}
      threadType={threadType}
    />
  );
}

export default Threads;
