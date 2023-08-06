import axios from 'axios'
import { sendEmail } from './sendEmail'

async function getReceiver (threadID) {
  try {
    const getThread = await axios.get(`/thread/${threadID}`);
    const thread = getThread.data.thread;
    const posterId = getThread.data.thread.poster;
    const getPoster = await axios.get(`/user/${posterId}`);
    const poster = getPoster.data.user;
    return { thread, poster };
  } catch (error) {
    console.error('Error in sendCommentEmailNotification:', error);
  }
}

export async function sendNotification(threadID, notificationType, subscriptionType) {
  try {
    // const getThread = await axios.get(`/thread/${threadID}`);
    // const posterId = getThread.data.thread.poster;
    // const getPoster = await axios.get(`/user/${posterId}`);
    // const poster = getPoster.data.user;
    const { poster } = getReceiver(threadID);
    if (poster.email && poster.subscription[subscriptionType] === true) {
      await sendEmail(
        poster.email,
        poster.username,
        notificationType,
        `http://localhost:3000/threads/${threadID}` // TODO: TO BE UPDATE
      );
    }
  } catch (error) {
    console.error('Error in Send Email Notification:', error);
  }
}

export async function sendGroupNotification(threadID, notificationType, subscriptionType) {
  try {
    const { thread } = getReceiver(threadID);
    const relevantThreads = thread.relevantThread;
    if (relevantThreads.length > 0) {
      for (const relevantThreadID of relevantThreads) {
        await sendNotification(relevantThreadID, notificationType, subscriptionType);
      }
    }
  } catch (error) {
    console.error('Error in Send Group Email Notification:', error);
  }
}