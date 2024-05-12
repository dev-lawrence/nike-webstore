const Maintenance = () => {
  return (
    <div className="maintenance">
      <div className="overlay"></div>
      <div className="container">
        <div className="flow">
          <div className="content">
            <h1>Maintenance in Progress</h1>
            <p>
              We're currently reworking on the website to enhance your
              experience. Thank you for your patience!
            </p>
          </div>
          <h2>What's Happening?</h2>
          <ul>
            <li>
              We're addressing issues related to the recent service closure of
              Cyclic.
            </li>
            <li>
              Enhancements are underway to improve performance and reliability.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
