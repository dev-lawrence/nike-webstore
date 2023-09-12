const SizeOptions = ({
  product,
  selectedSize,
  setSelectedSize,
  addToCartError,
  setAddToCartError,
}) => {
  // function to select size
  const handleSelectedSize = (event) => {
    setSelectedSize(event.target.value);
    setAddToCartError(null);
  };

  if (!product || !product.sizes) {
    return null;
  }

  return (
    <div className="shoe-sizes">
      <h4 className={addToCartError ? 'showError' : ''}>Select size</h4>
      <div className={`shoe ${addToCartError ? 'lineError' : ''}`}>
        {product.sizes.map((size) => {
          return (
            <div className="size" key={size._id}>
              <input
                type="radio"
                className="radio_input"
                name="shoe_size"
                id={size._id}
                value={size.value}
                onChange={handleSelectedSize}
                checked={selectedSize === size.value}
              />
              <label
                htmlFor={size._id}
                className={selectedSize === size.value ? 'line' : ''}
              >
                {size.value}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SizeOptions;
