import mongoose from "mongoose";

const Schema = mongoose.Schema;

const assetSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
        required: true,
      },
    ],
    assetSource: {
      url: {
        type: String,
        required: true,
      },
      keys: [
        {
          type: String,
          required: true,
        },
      ],
    },
    deleted: {
      type: Boolean,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Asset = mongoose.model("Asset", assetSchema);

export default Asset;
