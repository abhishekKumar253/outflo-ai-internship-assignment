import { Request, Response } from "express";
import Campaign from "../models/campaign.model";

export const getCampaigns = async (req: Request, res: Response) => {
  try {
    const campaigns = await Campaign.find({ status: { $ne: "deleted" } });
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ message: "Error fetching campaigns", error });
  }
};

export const getCampaignById = async (req: Request, res: Response) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign || campaign.status === "deleted") {
      res.status(404).json({ message: "Campaign not found" });
    }
    res.status(200).json(campaign);
  } catch (error) {
    res.status(500).json({ message: "Error fetching campaign", error });
  }
};

export const createCampaign = async (req: Request, res: Response) => {
  try {
    const campaign = new Campaign(req.body);
    const saved = await campaign.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Error creating campaign", error });
  }
};

export const updateCampaign = async (req: Request, res: Response) => {
  try {
    const campaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(campaign);
  } catch (error) {
    res.status(500).json({ message: "Error updating campaign", error });
  }
};

export const deleteCampaign = async (req: Request, res: Response) => {
  try {
    const updated = await Campaign.findByIdAndUpdate(
      req.params.id,
      { status: "deleted" },
      { new: true }
    );
    res.json({ message: "Campaign soft-deleted", campaign: updated });
  } catch (error) {
    res.status(500).json({ message: "Error deleting campaign", error });
  }
};
