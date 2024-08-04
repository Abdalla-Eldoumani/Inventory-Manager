import axios from 'axios';

const CLARIFAI_API_KEY = process.env.NEXT_PUBLIC_CLARIFAI_API_KEY;

export const getLabelsFromImage = async (imageData: string): Promise<string[] | null> => {
  try {
    const response = await axios.post(
      'https://api.clarifai.com/v2/models/food-item-recognition/outputs',
      {
        inputs: [
          {
            data: {
              image: { base64: imageData.split(',')[1] }
            }
          }
        ]
      },
      {
        headers: {
          'Authorization': `Key ${CLARIFAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    const labels = response.data.outputs[0].data.concepts.map((concept: any) => concept.name);
    return labels;
  } catch (error) {
    console.error('Error fetching labels from image', error);
    return null;
  }
};