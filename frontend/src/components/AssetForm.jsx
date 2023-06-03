import { Field, Form, Formik, useField } from "formik";
import * as Yup from "yup";
import DropZone from "./DropZone";
import assetManager from "../manager/assetManager";

const AssetFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "too Short!")
    .max(50, "too Long!")
    .required("required"),
  category: Yup.string()
    .min(2, "too Short!")
    .max(50, "too Long!")
    .required("required"),
  tags: Yup.string()
    .min(2, "too Short!")
    .max(50, "too Long!")
    .required("required"),
  folder: Yup.mixed().required("required"),
});

const handleSubmit = (values, { setSubmitting }) => {
  console.log(values.folder);

  const formData = new FormData();
  formData.append("folder", values.folder[0]);
  formData.append("tags", values.tags.split(","));
  formData.append("name", values.name);
  formData.append("category", values.category);
  assetManager
    .createAssetData(formData)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setSubmitting(false);
    });
};

const initialValues = { name: "", category: "", tags: "", folder: [] };

const FileUploader = ({ ...props }) => {
  const [field, meta, helpers] = useField(props); // name

  return <DropZone meta={meta} field={field} helpers={helpers} />;
};

const AssetForm = () => {
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={AssetFormSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form style={styles.form}>
            <Field name="name" placeholder="name*" style={styles.formField} />
            {errors.name && touched.name ? (
              <div style={styles.error}>{errors.name}</div>
            ) : null}
            <Field
              name="category"
              placeholder="category*"
              style={styles.formField}
            />
            {errors.category && touched.category ? (
              <div style={styles.error}>{errors.category}</div>
            ) : null}
            <Field name="tags" placeholder="tags*" style={styles.formField} />
            {errors.tags && touched.tags ? (
              <div style={styles.error}>{errors.tags}</div>
            ) : null}
            <div style={styles.info}>
              <span>add multiple tags using comma</span>
            </div>
            <FileUploader name="folder" />
            <button style={styles.submitBtn} type="submit">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const styles = {
  error: {
    color: "#D82E2F",
    fontWeight: 500,
    fontSize: "0.9rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    padding: "16px 6px",
    border: "solid 3px grey",
    width: "70vw",
  },
  formField: {
    width: "60%",
    height: "1.6rem",
    padding: "3px 6px",
  },
  info: {
    fontSize: 12,
    color: "#120E43",
    fontWeight: "bold",
  },
  submitBtn: { border: "solid 3px blue" },
};

export default AssetForm;
