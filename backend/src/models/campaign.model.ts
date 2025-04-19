import mongoose, { Document, Schema } from "mongoose";

export interface ICampaign extends Document {
  name: string;
  description?: string;
  status: "active" | "inactive" | "deleted";
  leads: string[];
  accountIDs: string[];
  createdAt: Date;
  updatedAt: Date;
}

const campaignSchema: Schema = new Schema<ICampaign>(
  {
    name: {
      type: String,
      required: [true, "Campaign name is required"],
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "deleted"],
      default: "active",
    },
    leads: {
      type: [String],
      default: [],
    },
    accountIDs: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Campaign = mongoose.model<ICampaign>("Campaign", campaignSchema);

export default Campaign;
