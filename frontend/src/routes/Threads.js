import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Forum from "../components/Forum/Forum";

function Threads() {
  const location = useLocation();
  const user = useSelector((state) => state.user);
  let filterOptions;
  let shouldOpenCreateThreadForm;
  let threadType;

  if (location.state) {
    if (location.state.shouldOpenCreateThreadForm && !user.username) {
      return <Navigate to="/login" replace />;
    } else {
      filterOptions = location.state.filterOptions;
      shouldOpenCreateThreadForm = location.state.shouldOpenCreateThreadForm;
      threadType = location.state.threadType;

    }
  } else { // occurs when user directly types '/threads' into the url
    filterOptions = 'all';
    shouldOpenCreateThreadForm = false;
  }

  return (
    <>
      <Forum
      filterOptions={filterOptions}
      shouldOpenCreateThreadForm={shouldOpenCreateThreadForm}
      threadType={threadType}
    />
    </>
  );
}

export default Threads;
