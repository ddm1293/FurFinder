import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

export const openai = new OpenAIApi(
  new Configuration({
    organization: process.env.GPT_ORGANIZATION,
    apiKey: process.env.GPT_API_KEY
  })
);

export const callGPT = async (prompt) => {
  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Give me an answer only as an exact number.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.2
    });
    return completion.data.choices[0].message.content;
  } catch (err) {
    console.error(err);
  }
};
