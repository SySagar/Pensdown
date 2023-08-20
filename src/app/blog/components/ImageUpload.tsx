/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const ImageUploader = ({ editor }: any) => {
  const onDrop = useCallback((acceptedFiles : any) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      const imgSrc = reader.result;
      editor.chain().focus().setImage({ src: imgSrc, alt: file.name }).run();
    };

    reader.readAsDataURL(file);
  }, [editor]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    // accept: 'image/*',
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag &amp; drop an image here, or click to select one</p>
    </div>
  );
};

export default ImageUploader;
