import { useLocation } from 'react-router-dom';
import Forum from "../components/Forum/Forum";

function Threads() {
  const location = useLocation();
  const { filterOptions, shouldOpenCreateThreadForm, threadType } = location.state;

  return (
    <Forum
      filterOptions={filterOptions}
      shouldOpenCreateThreadForm={shouldOpenCreateThreadForm}
      threadType={threadType}
    />
  );
}

export default Threads;
