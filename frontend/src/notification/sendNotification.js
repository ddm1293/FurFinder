import axios from 'axios'
import { sendEmail } from './sendEmail'

export async function sendNotification(threadID, notificationType, subscriptionType) {
  try {
    const getThread = await axios.get(`/thread/${threadID}`);
    const posterId = getThread.data.thread.poster;
    const getPoster = await axios.get(`/user/${posterId}`);
    const poster = getPoster.data.user;
    if (poster.email && poster.subscription[subscriptionType] === true) {
      await sendEmail(
        poster.email,
        poster.username,
        notificationType,
        `https://furfinder.onrender.com/threads/${threadID}`
      );
    }
  } catch (error) {
    console.error('Error in sendCommentEmailNotification:', error);
  }
}
