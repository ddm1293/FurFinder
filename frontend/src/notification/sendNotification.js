import axios from 'axios'
import { sendEmail } from './sendEmail'
import { getApiUrl } from '../utils/getApiUrl'

export async function sendNotification(threadID, notificationType, subscriptionType) {
  try {
    const getThread = await axios.get(getApiUrl(`/thread/${threadID}`));
    const posterId = getThread.data.thread.poster;
    const getPoster = await axios.get(getApiUrl(`/user/${posterId}`));
    const poster = getPoster.data.user;
    const url = process.env.REACT_APP_NODE_ENV === 'production' ?
      `https://furfinder.onrender.com/threads/${threadID}` : `http://localhost:3000/threads/${threadID}`;
    if (poster.email && poster.subscription[subscriptionType] === true) {
      await sendEmail(
        poster.email,
        poster.username,
        notificationType,
        url
      );
    }
  } catch (error) {
    console.error('Error in sendCommentEmailNotification:', error);
  }
}
