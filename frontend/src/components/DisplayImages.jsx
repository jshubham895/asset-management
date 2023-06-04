import { useEffect, useState } from "react";
import ImageGrid from "./ImageGrid";
import assetManager from "../manager/assetManager";
import Chip from "./Chip";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const DisplayImages = () => {
  const [imageGroup, setimageGroup] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async () => {
      const response = await assetManager.getAssetInfo();
      const imageGroup = [];
      response.data.forEach((data, index) => {
        const images = data.assetSource.keys.map(
          (key) => `${data.assetSource.url}/${key}`
        );
        imageGroup[index] = {
          id: data._id,
          albumName: data.name,
          category: data.category,
          tags: data.tags,
          images,
        };
        setLoading(false);
      });
      setimageGroup(imageGroup);
    };
    fetchImages();
  }, []);

  if (loading) {
    return (
      <div>
        <h1>Images</h1>
        <h3>loading...</h3>
      </div>
    );
  }

  const handleUpdate = (imageGroup) => {
    navigate(`/update-asset/${imageGroup.id}`);
  };

  return (
    <div>
      <h1>Image </h1>
      {imageGroup.map((imageRow, index) => {
        return (
          <div key={`group-${index}`} className="image-group-container">
            <h1 key={`category-${index}`}>Category : {imageRow.category}</h1>
            <Chip key={`chip-${index}`} tags={imageRow.tags} />
            <button
              className="update-group-btn"
              title="click to update image group"
              onClick={() => handleUpdate(imageRow)}
            >
              need changes <FiEdit />
            </button>
            <ImageGrid key={`imageRow-${index}`} images={imageRow.images} />
          </div>
        );
      })}
    </div>
  );
};

export default DisplayImages;
