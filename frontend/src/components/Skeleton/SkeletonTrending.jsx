import Shimmer from './Shimmer';
import SkeletonElement from './SkeletonElement';

const SkeletonTrending = () => {
  return (
    <div className="product-skeleton-wrapper">
      <div className="trending-products">
        <div>
          <SkeletonElement type="popularImg" />

          <SkeletonElement type="name" />
          <SkeletonElement type="subName" />
          <SkeletonElement type="price" />
        </div>

        <div className="hide">
          <SkeletonElement type="popularImg" />

          <SkeletonElement type="name" />
          <SkeletonElement type="subName" />
          <SkeletonElement type="price" />
        </div>

        <div className="hide">
          <SkeletonElement type="popularImg" />

          <SkeletonElement type="name" />
          <SkeletonElement type="subName" />
          <SkeletonElement type="price" />
        </div>

        <div className="hide">
          <SkeletonElement type="popularImg" />

          <SkeletonElement type="name" />
          <SkeletonElement type="subName" />
          <SkeletonElement type="price" />
        </div>
      </div>

      <Shimmer />
    </div>
  );
};

export default SkeletonTrending;
