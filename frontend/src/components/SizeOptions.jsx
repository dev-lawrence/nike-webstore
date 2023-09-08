import { useState } from 'react';

const SizeOptions = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(null);

  // function to select size
  const handleSelectedSize = (event) => {
    setSelectedSize(event.target.value);
  };

  if (!product || !product.sizes) {
    return null;
  }

  return (
    <div className="shoe-sizes">
      <h4>Select size</h4>
      <div className="shoe">
        {product.sizes.map((size) => {
          return (
            <div className="size" key={size.id}>
              <input
                type="radio"
                className="radio_input"
                name="shoe_size"
                id={size.id}
                value={size.value}
                onChange={handleSelectedSize}
              />
              <label
                htmlFor={size.id}
                className={selectedSize === size.value ? 'line' : ''}
              >
                {size.label}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SizeOptions;
