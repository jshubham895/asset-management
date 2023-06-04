import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import assetManager from "../manager/assetManager";
import UpdateForm from "./UpdateForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateAsset = () => {
  let { assetId } = useParams();
  const [loading, setLoading] = useState(true);
  const [assetData, setAssetData] = useState({});

  useEffect(() => {
    fetchAsset(assetId);
  }, [assetId]);

  const fetchAsset = async (assetId) => {
    setLoading(true);
    const response = await assetManager.getAssetById(assetId);
    setAssetData(response.data);
    setLoading(false);
  };

  const reloadForm = () => {
    fetchAsset(assetId);
    toast.success("Update successful");
  };

  return (
    <div className="full-width">
      <Navbar />
      {!loading ? (
        <div className="center-container">
          <UpdateForm
            assetData={assetData}
            setLoading={setLoading}
            reloadForm={reloadForm}
          />
        </div>
      ) : (
        <div className="center-container">loading...</div>
      )}

      <ToastContainer />
    </div>
  );
};

export default UpdateAsset;
