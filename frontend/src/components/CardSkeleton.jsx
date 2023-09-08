import Skeleton from 'react-loading-skeleton';

const CardSkeleton = () => {
  return (
    <div className="card skeleton-card">
      <Skeleton width="100%" height="200px" />
      <Skeleton width="80%" height="20px" />
      <Skeleton width="50%" height="20px" />
    </div>
  );
};

export default CardSkeleton;
