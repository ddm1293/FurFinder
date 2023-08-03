import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import CardView from '../Forum/CardView'
import { getThreadsAsync } from '../../thunk/forumThunk'
function MyThreadListing () {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const myThread= user.myThreads;

  const cardsPerPage = useSelector((state) => state.forum.pageSizeCard);
  const pagesFromSlice = useSelector((state) => state.forum.pages);

  const [totalThreadNum, setTotalThreadNum] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    dispatch(getThreadsAsync(myThread));
  }, [dispatch]);


  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  let displayedCards = pagesFromSlice[currentPage] || [];
  if (threads && threads.length > 0) {
    displayedCards = threads.slice(startIndex, endIndex);
  }

  return (
    <div className="profile">
      <h2>My Thread Listing</h2>
      <CardView items={displayedCards} />

    </div>
  )
};

export default MyThreadListing;

