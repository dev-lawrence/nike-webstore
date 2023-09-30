import Shimmer from './Shimmer';
import SkeletonElement from './SkeletonElement';

const SkeletonProduct = () => {
  return (
    <div className="product-skeleton-wrapper">
      <div className="content d-flex | d-grid">
        <div className="title | mobile-title">
          <SkeletonElement type="name" />
          <SkeletonElement type="subName" />
          <SkeletonElement type="price" />
        </div>

        <div>
          <SkeletonElement type="mainImg" />

          <div className="product-flex">
            <SkeletonElement type="thumbnail" />
            <SkeletonElement type="thumbnail" />
            <SkeletonElement type="thumbnail" />
            <SkeletonElement type="thumbnail" />
          </div>
        </div>

        <div>
          <div className="desktop-title">
            <SkeletonElement type="name" />
            <SkeletonElement type="subName" />
            <SkeletonElement type="price" />
          </div>

          <div className="details">
            <div>
              <SkeletonElement type="name" />
            </div>
            <div className="sizes">
              <SkeletonElement type="size" />
              <SkeletonElement type="size" />
              <SkeletonElement type="size" />
              <SkeletonElement type="size" />
              <SkeletonElement type="size" />
              <SkeletonElement type="size" />
            </div>
          </div>
        </div>
      </div>

      <Shimmer />
    </div>
  );
};

export default SkeletonProduct;
