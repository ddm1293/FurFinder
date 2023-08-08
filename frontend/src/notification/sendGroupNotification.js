import axios from 'axios'
import { sendNotification } from './sendNotification'
import { getApiUrl } from '../utils/getApiUrl';

export async function sendGroupNotification (threadID, notificationType, subscriptionType) {
  try {
    const getThread = await axios.get(getApiUrl(`/thread/${threadID}`));
    const thread = getThread.data.thread;
    if (thread.threadType === 'witnessThread' && thread.relevant.length > 0) {
      const relevantThreads = thread.relevant;
      for (const relevantThreadID of relevantThreads) {
        await sendNotification(relevantThreadID, notificationType, subscriptionType)
      }
    }
  } catch (error) {
    console.error('Error in Send Group Email Notification:', error)
  }
}