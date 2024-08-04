"use client";

import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import Webcam from 'react-webcam';
import Image from 'next/image';
import { recognizeItemFromImage } from '@/lib/openai-image';

interface AddItemCameraProps {
  addItem: (name: string, quantity: number) => void;
}

const AddItemCamera = forwardRef<{ stopCamera: () => void }, AddItemCameraProps>(({ addItem }, ref) => {
  const webcamRef = useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
    }
  }, [webcamRef]);

  const handleRecognizeItem = async () => {
    if (capturedImage) {
      setIsLoading(true);
      setError(null);
      try {
        const recognizedItem = await recognizeItemFromImage(capturedImage);
        if (recognizedItem) {
          addItem(recognizedItem, 1); // Adding default quantity as 1
        } else {
          setError('Could not recognize the item. Please try again.');
        }
      } catch (err) {
        setError('Error recognizing item. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  useImperativeHandle(ref, () => ({
    stopCamera: () => {
      // Logic to stop the webcam if needed
    },
  }));

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="rounded-lg shadow-lg"
        />
      </div>
      {capturedImage && (
        <div className="mb-4">
          <Image src={capturedImage} alt="Captured item" width={320} height={240} className="rounded-lg shadow-lg" />
        </div>
      )}
      <div className="flex space-x-4">
        <button onClick={capture} className="btn-secondary">Capture Image</button>
        <button onClick={handleRecognizeItem} className="btn-primary" disabled={isLoading || !capturedImage}>
          {isLoading ? 'Recognizing...' : 'Add Item'}
        </button>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
});

AddItemCamera.displayName = 'AddItemCamera';

export default AddItemCamera;