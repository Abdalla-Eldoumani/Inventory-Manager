import axios from 'axios';
import toast from 'react-hot-toast';

const openaiApiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

export const recognizeItemFromImage = async (imageDataUrl: string): Promise<string | null> => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: "davinci-codex",
        prompt: `Recognize the item in the image: ${imageDataUrl}`,
        max_tokens: 50
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiApiKey}`,
        },
      }
    );
    const itemName = response.data.choices[0].text.trim();
    toast.success('Item recognized successfully!');
    return itemName;
  } catch (error) {
    toast.error('Error recognizing item from image. Please try again.');
    console.error('Error recognizing item from image:', error);
    return null;
  }
};
