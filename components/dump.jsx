// {
//   "id": "l5",
//   "user_id": "uu12",
//   "user_email": "hssnkizz@gmail.com",
//   "user_name": "hussein kizz",
//   "user_contact": "0786234982",
//   "user_avatar": "image",
//   "width": 60,
//   "height": 100,
//   "location": "masuulita",
//   "installments": true,
//   "is_sold": true,
//   "price": 25000000,
//   "photos": "image",
//   "info": "Like this is really a good land sold!",
//   "created_at": "18:11 PM, 26-06-2022",
//   "updated_at": "18:41 PM, 26-06-2022"
// }
import Image from 'next/image';
import { Zoom, Fade } from 'react-reveal';
import { useState } from 'react';
import Link from 'next/link';
import * as HiIcons from 'react-icons/hi';

// ? import sample images
import sampleImage from '../public/images/img4.jpg';

const EditPostModal = ({ post, handleClose }) => {
  const [imageIsLoading, setImageIsLoading] = useState(true);

  return (
    <section className="absolute z-50 w-full min-h-screen bg-gray-900 opactiy-60 overflow-hidden top-full bottom-full mx-auto">
      <form>
        <h1>Edit modal</h1>
      </form>
    </section>
  );
};

export default EditPostModal;
