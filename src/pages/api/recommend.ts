import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const GPT_MODEL = 'gpt-4o-mini';
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { location, language } = req.body;
  const prompts = {
    breakfast: `Provide a local healthy daily breakfast food and drink recommendation for someone in ${location}. Don't put word "breakfast" please. Use ${language} in response`,
    lunch: `Provide a local healthy daily lunch food and drink recommendation for someone in ${location}. Don't put word "lunch" please. Use ${language} in response`,
    dinner: `Provide a local healthy daily dinner food and drink recommendation for someone in ${location}. Don't put word "dinner" please. Use ${language} in response`,
  };

  try {
    const [breakfastResponse, lunchResponse, dinnerResponse] = await Promise.all([
      openai.chat.completions.create({
        model: GPT_MODEL,
        messages: [{ role: 'system', content: prompts.breakfast }],
      }),
      openai.chat.completions.create({
        model: GPT_MODEL,
        messages: [{ role: 'system', content: prompts.lunch }],
      }),
      openai.chat.completions.create({
        model: GPT_MODEL,
        messages: [{ role: 'system', content: prompts.dinner }],
      })
    ]);

    const breakfast = breakfastResponse.choices[0].message.content;
    const lunch = lunchResponse.choices[0].message.content;
    const dinner = dinnerResponse.choices[0].message.content;

    res.status(200).json({ breakfast, lunch, dinner });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate recommendation' });
  }
}