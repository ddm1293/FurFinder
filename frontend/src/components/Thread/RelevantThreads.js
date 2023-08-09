import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import '../../style/Thread/RelevantThreads.css';
import { getThreadAsync } from '../../thunk/threadThunk';
import RelevantThreadCard from './RelevantThreadCard';
import { getApiUrl } from '../../utils/getApiUrl'

function RelevantThreads(props) {
  const dispatch = useDispatch();
  const [relevantThreads, setRelevantThreads] = useState([]);
  const [thread, setThread] = useState([]);
  const [relevant, setRelevant] = useState(null);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    dispatch(getThreadAsync(props.threadID)).then(({payload}) => {
      setThread(payload.thread);
    });
  }, [dispatch, props]);

  useEffect(() => {
    if (thread) {
      setRelevant(thread.relevant);
    }
  }, [thread]);

  useEffect(() => {
    if (relevant) {
      const fetchThreads = async () => {
        const threads = await Promise.all(relevant.map(id => axios.get(getApiUrl(`/thread/${id}`))));
        setRelevantThreads(threads.map(response => response.data.thread));
      };
      fetchThreads();
    }
  }, [relevant]);

  useEffect(() => {
    if (relevant) {
      const fetchPets = async () => {
        const petsData = await Promise.all(relevantThreads.map(thread => axios.get(getApiUrl(`/pet/${thread.pet}`))));
        setPets(petsData.map(response => response.data));
      };
      if (relevantThreads.length > 0) {
        fetchPets();
      }
    }
  }, [relevantThreads, relevant]);

  if (relevantThreads.length === 0) {
    return null;
  }

  return (
    <div className="relevant-threads-container">
      <div className="relevant-threads">
        <p className="relevant-threads-intro">Relevant threads suggested by our matching algorithm:</p>
        <div className="relevant-threads-cards">
          {relevantThreads.map((thread, index) => {
            const pet = pets[index];
            if (pet) {
              const petImgUrl = getApiUrl(`/pet/${pet._id}/coverImage`);
              return (
                <a href={`/threads/${thread._id}`} target="_blank" rel="noreferrer noopener" key={thread._id}>
                  <div className="relevant-thread-card-wrapper">
                    <RelevantThreadCard pet={pet} src={petImgUrl} />
                  </div>
                </a>

              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
}

export default RelevantThreads;
