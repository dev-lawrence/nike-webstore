import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const Modal = ({ openModal, closeModal, product }) => {
  return (
    <div className="modal">
      <div className={`overlay ${openModal ? 'show' : ''}`}></div>
      <div className={`modal-container  ${openModal ? 'open' : ''}`}>
        <div className="content">
          <div className="modal-flex">
            <img src={product.image} alt="" />
            <div>
              <h4>{product.name}</h4>
              <span>${product.price}</span>
            </div>
            <button
              onClick={() => {
                closeModal(false);
              }}
            >
              <CloseRoundedIcon className="close-icon" />
            </button>
          </div>

          <div className="description">
            <p>{product.description}</p>

            <h3>Benefits</h3>
            {product.benefits.map((benefit) => {
              return <li key={benefit.id}>{benefit.value}</li>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
