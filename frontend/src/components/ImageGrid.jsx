const ImageGrid = ({ images }) => {
  return (
    <div className="image-grid">
      {images.map((image, index) => (
        <div key={index} className="card">
          <img src={image} alt={`Image ${index}`} className="card-image" />
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
