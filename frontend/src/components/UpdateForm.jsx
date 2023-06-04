import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import assetManager from "../manager/assetManager";
import { useNavigate } from "react-router-dom";
import { CgPlayListRemove } from "react-icons/cg";

const UpdateForm = ({ assetData, setLoading, reloadForm }) => {
  const navigate = useNavigate();
  const initialValues = {
    category: assetData.category,
    name: assetData.name,
    tags: [...assetData.tags],
  };
  const validationSchema = Yup.object().shape({
    category: Yup.string().required("category is required"),
    name: Yup.string().required("name is required"),
    tags: Yup.array()
      .min(1, "at least one tag is required")
      .of(Yup.string().required("tag is required")),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const updateFormBody = {
      name: values.name,
      category: values.category,
      tags: [...values.tags],
    };
    const response = await assetManager.updateAssetById(
      assetData._id,
      updateFormBody
    );
    reloadForm();
    setSubmitting(false);
  };

  const handleDelete = async () => {
    // Handle delete button logic here
    try {
      setLoading(true);
      await assetManager.deleteAssetById(assetData._id);
      navigate("/dashboard");
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleDeleteTag = (index, form) => {
    const updatedTags = form.values.tags.filter(
      (tag) => tag !== form.values.tags[index]
    );
    form.setFieldValue("tags", updatedTags);
    form.setFieldTouched("tags", true);
  };

  const handleAddTag = (form) => {
    form.setFieldValue("tags", [...form.values.tags, ""]);
    form.setFieldTouched("tags", true);
  };
  return (
    <div>
      <h1>Update Form</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, dirty }) => (
          <Form className="update-asset-form">
            <div className="direction-column">
              <label htmlFor="category">Category</label>
              <Field type="text" id="category" name="category" />
              <ErrorMessage name="category" component="div" />
            </div>

            <div className="direction-column">
              <label htmlFor="name">Name</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" component="div" />
            </div>

            <div>
              <label htmlFor="tags">Tags</label>
              <FieldArray name="tags">
                {({ form }) => (
                  <div className="tag-input-container">
                    {form.values.tags.map((tag, index) => (
                      <div key={index}>
                        <Field
                          type="text"
                          name={`tags[${index}]`}
                          value={tag}
                          placeholder="add new tag"
                          className="tag-input"
                        />
                        {form.values.tags.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleDeleteTag(index, form)}
                            className="cross-btn"
                            title="remove tag from asset"
                          >
                            X
                          </button>
                        )}
                        <ErrorMessage
                          name={`tags.${index}`}
                          component="div"
                          className="error-message"
                        />
                      </div>
                    ))}
                    <button type="button" onClick={() => handleAddTag(form)}>
                      Add Tag
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>

            <button type="submit" disabled={isSubmitting || !dirty}>
              Update
            </button>
          </Form>
        )}
      </Formik>

      <button onClick={handleDelete} className="delete-asset-btn">
        Delete
      </button>
    </div>
  );
};

export default UpdateForm;
