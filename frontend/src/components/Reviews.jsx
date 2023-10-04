import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarRating from './StarRating';
import { useClerk } from '@clerk/clerk-react';

const { VITE_API_URL } = import.meta.env;

const Reviews = ({ product }) => {
  const { user, openSignIn } = useClerk();
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ text: '', rating: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${VITE_API_URL}/reviews/${product._id}/reviews?approved=true`
        );
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching product reviews:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [product._id]);

  const submitReview = async (e) => {
    e.preventDefault();

    if (!user) {
      openSignIn();
      return;
    }

    try {
      setIsLoading(true);
      await axios.post(`${VITE_API_URL}/reviews/${product._id}/reviews`, {
        clerkUserId: user.id,
        text: newReview.text,
        rating: newReview.rating,
        approved: false,
      });

      setIsLoading(false);
      setFeedbackMessage(
        'Your review has been submitted for approval. It will be visible once approved.'
      );
      setNewReview({ text: '', rating: 0 });
    } catch (error) {
      console.error('Error submitting product review:', error);
      setIsLoading(false);
      setFeedbackMessage(
        'An error occurred while submitting your review. Please try again later.'
      );
    }
  };

  return (
    <div className="reviews-section">
      <p>{feedbackMessage}</p>
      {isLoading && <p>Loading reviews...</p>}
      {!isLoading && reviews.length === 0 && <p>No reviews yet.</p>}
      {!isLoading && reviews.length > 0 && (
        <ul>
          {reviews.map((review) => (
            <li key={review._id}>
              <p>{review.text}</p>
              <div className="star-rating">
                <StarRating rating={review.rating} />
              </div>
            </li>
          ))}
        </ul>
      )}

      {!isLoading && (
        <div className="review-form">
          <h4>Write a Review</h4>
          <form onSubmit={submitReview}>
            <textarea
              rows="4"
              cols="50"
              value={newReview.text}
              onChange={(e) =>
                setNewReview({ ...newReview, text: e.target.value })
              }
              placeholder="Write your review here"
            />
            <div className="star-rating">
              <StarRating
                rating={newReview.rating}
                onStarClick={(rating) => setNewReview({ ...newReview, rating })}
              />
            </div>
            <button className="btn-filled" type="submit">
              Submit Review
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Reviews;

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import StarRating from './StarRating';
// const { VITE_API_URL } = import.meta.env;
// import { useClerk } from '@clerk/clerk-react';

// const Reviews = ({ product }) => {
//   const { user, openSignIn } = useClerk();
//   const [reviews, setReviews] = useState([]);
//   const [newReview, setNewReview] = useState({ text: '', rating: 0 });

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await axios.get(
//           `${VITE_API_URL}/products/${product._id}/reviews?approved=true`
//         );
//         setReviews(response.data);
//       } catch (error) {
//         console.error('Error fetching product reviews:', error);
//       }
//     };

//     fetchReviews();
//   }, [product._id]);

//   const submitReview = async (e) => {
//     e.preventDefault();

//     if (!user) {
//       openSignIn();
//     }

//     try {
//       await axios.post(`${VITE_API_URL}/products/${product._id}/reviews`, {
//         clerkUserId: user.id,
//         text: newReview.text,
//         rating: newReview.rating,
//         approved: false,
//       });

//       setNewReview({ text: '', rating: 0 });
//     } catch (error) {
//       console.error('Error submitting product review:', error);
//     }
//   };

//   return (
//     <div className="reviews-section">
//       <ul>
//         {reviews.map((review) => (
//           <li key={review._id}>
//             <p>{review.text}</p>
//             <div className="star-rating">
//               <StarRating rating={review.rating} />
//             </div>
//           </li>
//         ))}
//       </ul>

//       <div className="review-form">
//         <h4>Write a Review</h4>
//         <form onSubmit={submitReview}>
//           <textarea
//             rows="4"
//             cols="50"
//             value={newReview.text}
//             onChange={(e) =>
//               setNewReview({ ...newReview, text: e.target.value })
//             }
//             placeholder="Write your review here"
//           />
//           <div className="star-rating">
//             <StarRating
//               rating={newReview.rating}
//               onStarClick={(rating) => setNewReview({ ...newReview, rating })}
//             />
//           </div>
//           <button className="btn-filled" type="submit">
//             Submit Review
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Reviews;
