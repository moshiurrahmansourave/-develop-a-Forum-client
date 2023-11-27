
import axios from 'axios';
import { useState } from 'react';

const LikeButton = ({ postId }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = async () => {
    try {
      // Make a POST request to your server endpoint
      const response = await axios.post(`/like/${postId}`);
      console.log(response.data); // Log server response

      // Update the UI state if the like was successful
      if (response.status === 200) {
        setIsLiked(true);
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return (
    <button onClick={handleLike} disabled={isLiked}>
      {isLiked ? 'Liked!' : 'Like'}
    </button>
  );
};

export default LikeButton;