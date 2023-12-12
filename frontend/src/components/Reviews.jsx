import { useState, useEffect } from 'react';
import axios from 'axios';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useClerk } from '@clerk/clerk-react';
import useFetchData from '../hooks/useFetchData';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import ReviewModal from './ReviewModal';

const { VITE_API_URL } = import.meta.env;

const Reviews = ({ product, handleToggleReviews, showReviews }) => {
  const { user, openSignIn } = useClerk();
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    text: '',
    rating: 0,
    title: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [ratingErrorMessage, setRatingErrorMessage] = useState('');
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [alreadySubmittedMessage, setAlreadySubmittedMessage] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const name = product.name;
  const image = product.image;

  const handleRatingChange = (star) => {
    setRating(star);
    setNewReview({ ...newReview, rating: star });
  };

  const { data: fetchedReviews, loading } = useFetchData(
    `${VITE_API_URL}/reviews/${product._id}/reviews?approved=true`
  );

  useEffect(() => {
    if (fetchedReviews) {
      setReviews(fetchedReviews);
    }
  }, [fetchedReviews, setReviews]);

  const submitReview = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      setRatingErrorMessage('Select an overall rating');
      return;
    } else {
      setRatingErrorMessage('');
    }

    if (!user) {
      openSignIn();
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${VITE_API_URL}/reviews/${product._id}/reviews`,
        {
          clerkUserId: user.id,
          userName: user.fullName,
          text: newReview.text,
          rating: newReview.rating,
          title: newReview.title,
          approved: false,
        }
      );

      setIsLoading(false);
      if (response.status === 201) {
        setSubmissionMessage('Your review has been submitted for approval!.');
        setNewReview({ text: '', rating: 0, title: '' });
        setRating(0);
      }
    } catch (error) {
      console.error('Error submitting product review:', error);
      setAlreadySubmittedMessage('');
      setIsLoading(false);
    }
  };

  // Helper function to generate star icons
  const generateStarIcons = (rating) => {
    const stars = [];
    [1, 2, 3, 4, 5].forEach((star) => {
      stars.push(
        <span key={star} className="star">
          {star <= rating ? <StarIcon /> : <StarBorderIcon />}
        </span>
      );
    });

    return stars;
  };

  // Function to toggle the modal and body scroll
  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const handleReviewTextChange = (e) => {
    setNewReview({ ...newReview, text: e.target.value });
  };

  const handleReviewTitleChange = (e) => {
    setNewReview({ ...newReview, title: e.target.value });
  };

  // get date
  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    return date.toLocaleDateString('en-NG', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className="reviews-section">
      <div
        onClick={toggleModal}
        className={`overlay ${openModal ? 'show' : ''}`}
      ></div>
      <button className="flex" onClick={handleToggleReviews}>
        <span className="reviews-text">Reviews ({reviews.length})</span>

        {showReviews ? (
          <KeyboardArrowUpRoundedIcon className="icon" />
        ) : (
          <ExpandMoreRoundedIcon className="icon" />
        )}
      </button>

      {showReviews && (
        <>
          {fetchedReviews && reviews.length === 0 && (
            <p className="no-review">
              Have your say. Be the first to review the {product.name}.
            </p>
          )}

          <button onClick={toggleModal} className="review-btn">
            Write a review
          </button>

          {loading && <p>Loading reviews...</p>}
          {fetchedReviews && reviews.length > 0 && (
            <ul>
              {reviews.map((review) => (
                <li className="review" key={review._id}>
                  <p className="review-output-title">{review.title}</p>
                  <div className="review-flex">
                    <div>
                      <p className="review-output-star">
                        {generateStarIcons(review.rating)}
                      </p>
                    </div>

                    <div className="user">
                      <p className="user-name">
                        {review.userName} - {formatDate(review.createdAt)}.
                      </p>
                    </div>
                  </div>
                  <p className="review-output-text">{review.text}</p>
                </li>
              ))}

              {showReviews ? <hr /> : ''}
            </ul>
          )}

          {openModal && (
            <ReviewModal
              isLoading={isLoading}
              submitReview={submitReview}
              name={name}
              image={image}
              product={product}
              reviewText={newReview.text}
              reviewTitle={newReview.title}
              onReviewTextChange={handleReviewTextChange}
              onReviewTitleChange={handleReviewTitleChange}
              rating={rating}
              closeModal={toggleModal}
              handleRatingChange={handleRatingChange}
              submissionMessage={submissionMessage}
              ratingErrorMessage={ratingErrorMessage}
              alreadySubmittedMessage={alreadySubmittedMessage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Reviews;
