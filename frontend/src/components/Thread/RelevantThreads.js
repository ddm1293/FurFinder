import React, { useEffect, useState } from 'react';
import { useDispatch} from 'react-redux';
import axios from 'axios';
import RelevantThreadMap from './RelevantThreadMap';
import '../../style/Thread/RelevantThreads.css'
import { getThreadAsync } from '../../thunk/threadThunk'

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
        const threads = await Promise.all(relevant.map(id => axios.get(`http://localhost:3001/thread/${id}`)));
        setRelevantThreads(threads.map(response => response.data.thread));
      };
      fetchThreads();
    }
  }, [relevant]);

  useEffect(() => {
    if (relevant) {
      const fetchPets = async () => {
        const petsData = await Promise.all(relevantThreads.map(thread => axios.get(`http://localhost:3001/pet/${thread.pet}`)));
        setPets(petsData.map(response => response.data));
      };
      if (relevantThreads.length > 0) {
        fetchPets();
      }
    }
  }, [relevantThreads, relevant]);

  if (relevantThreads.length === 0) {
    // Don't render the component if there are no relevant threads.
    return null;
  }

  return (
    <div className="relevant-threads-container">
      <div className="relevant-threads">
        <p className="relevant-threads-intro">Relevant threads suggested by our matching algorithm:</p>
        <div className="relevant-threads-maps">
          {relevantThreads.map((thread, index) => {
            const pet = pets[index];
            return (
              <a href={`/threads/${thread._id}`} target="_blank" rel="noreferrer noopener" key={thread._id}>
                {pet && pet.lastSeenLocation && (
                  <div className="relevant-thread-map">
                    <RelevantThreadMap
                      lastSeenLocation={{
                        lat: pet.lastSeenLocation.coordinates[1],
                        lng: pet.lastSeenLocation.coordinates[0]
                      }}
                    />
                  </div>
                )}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );

}

export default RelevantThreads;
