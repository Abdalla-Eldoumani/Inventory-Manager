import axios from 'axios';
import toast from 'react-hot-toast';

const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

export const generateRecipe = async (ingredients: string[]): Promise<string | null> => {
  try {
    const messages = [
      { role: 'system', content: 'You are a helpful assistant that generates recipes based on available ingredients.' },
      { role: 'user', content: `I have the following ingredients in my inventory: ${ingredients.join(', ')}. Please suggest a recipe using these ingredients.` }
    ];

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: messages,
        max_tokens: 1024,
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    toast.success('Recipe generated successfully!');
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    toast.error('Error generating recipe. Please try again.');
    console.error('Error generating recipe', error);
    return null;
  }
};