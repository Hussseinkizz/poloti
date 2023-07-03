import { useState, useEffect } from 'react';

export function useImagePreview(file) {
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, [file]);
  return { previewUrl };
}

// import { useRef } from 'react';

// export function useImagePreview(file) {
//   const resultRef = useRef('');
//   const reader = new FileReader();
//   reader.onloadend = () => {
//     const result = reader.result;
//     resultRef.current = result;
//     // console.log(result);
//   };
//   reader.readAsDataURL(file);
//   return { previewUrl: resultRef };
// }
