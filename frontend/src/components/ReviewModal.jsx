import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Link } from 'react-router-dom';
import SuccessImg from '../assets/checkmark.webp';
import Spinner from './Spinner';

const ReviewModal = ({
  isLoading,
  submitReview,
  reviewText,
  reviewTitle,
  onReviewTextChange,
  onReviewTitleChange,
  handleRatingChange,
  rating,
  product,
  closeModal,
  submissionMessage,
  alreadySubmittedMessage,
  ratingErrorMessage,
}) => {
  return (
    <>
      <div
        className={`review-form ${
          submissionMessage
            ? 'submission-form'
            : alreadySubmittedMessage
            ? 'submission-form'
            : ''
        }`}
      >
        {submissionMessage && (
          <div className="submission-message">
            <img src={SuccessImg} alt="" />
            <p>{submissionMessage}</p>
            <Link className="btn-filled width" to="/shop">
              Continue Shopping
            </Link>

            <button onClick={closeModal}>
              <CloseRoundedIcon className="close-icon" />
            </button>
          </div>
        )}

        {alreadySubmittedMessage && (
          <div className="submission-message">
            <p>{alreadySubmittedMessage}</p>
            <Link className="btn-filled width" to="/shop">
              Continue Shopping
            </Link>

            <button onClick={closeModal}>
              <CloseRoundedIcon className="close-icon" />
            </button>
          </div>
        )}

        {!submissionMessage && !alreadySubmittedMessage && (
          <div className="review-form-container">
            <div className="review-title">
              <div>
                <h4>Write a Review</h4>
                <p>Share your thoughts with everyone.</p>
              </div>

              <button onClick={closeModal}>
                <CloseRoundedIcon className="close-icon" />
              </button>
            </div>

            <div className="product-details">
              <div className="product-flex">
                <img src={product.image} alt="" />
                <p>{product.name}</p>
              </div>
            </div>

            <div className="rating">
              <h4> Overall rating *</h4>

              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className="star"
                    onClick={() => handleRatingChange(star)}
                  >
                    {star <= rating ? (
                      <StarIcon className="star-icon" />
                    ) : (
                      <StarBorderIcon className="star-icon" />
                    )}
                  </span>
                ))}
              </div>

              <p className="error-message">{ratingErrorMessage}</p>
            </div>

            <form className="form" onSubmit={submitReview}>
              <h4>Your Review *</h4>
              <textarea
                cols="9"
                rows="9"
                value={reviewText}
                onChange={onReviewTextChange}
                placeholder="Write your review here"
                required
              />
              <small>
                Describe what you liked, what you didn’t like, and other key
                things shoppers should know.
              </small>

              <div className="review-input-title">
                <h4>Review title *</h4>
                <input
                  type="text"
                  value={reviewTitle}
                  onChange={onReviewTitleChange}
                  required
                />
              </div>

              <button
                className="btn-filled form-btn"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? <Spinner /> : 'Submit Review'}
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default ReviewModal;
