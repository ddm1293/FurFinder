import { useLocation } from 'react-router-dom';
import Forum from "../components/Forum/Forum";

function Threads() {
  const location = useLocation();
  let filterOptions;
  let shouldOpenCreateThreadForm;
  let threadType;

  if (location.state) {
    filterOptions = location.state.filterOptions;
    shouldOpenCreateThreadForm = location.state.shouldOpenCreateThreadForm;
    threadType = location.state.threadType;
  } else {
    filterOptions = 'all';
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
