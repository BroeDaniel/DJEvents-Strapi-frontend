import { useState, ChangeEvent, MouseEvent } from 'react';
import { API_URL } from '@/config/index';
import styles from '@/styles/Form.module.css';

type CompProps = {
  evtId: string;
  imageUploaded: () => void;
  token: string;
};

export default function ImageUpload({
  evtId,
  imageUploaded,
  token,
}: CompProps) {
  const [image, setImage] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    if (image !== null) {
      formData.append('files', image);
      formData.append('ref', 'events');
      formData.append('refId', evtId);
      formData.append('field', 'image');
    } else {
      console.log('No image was uploaded');
    }
    console.log('token', token);

    const res = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (res.ok) {
      imageUploaded();
    }
  };

  return (
    <div className={styles.form}>
      <h1>Upload event image</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type='file' onChange={handleFileChange} />
        </div>
        <input type='submit' value='Upload' className='btn' />
      </form>
    </div>
  );
}
