import { Request, Response } from "express";
import Account from "../../models/Account";

export const getAllAccounts = async (req: Request, res: Response) => {
  try {
    const accounts = await Account.find().select("-createdAt -updatedAt");
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch accounts" });
  }
};

export const getAccountById = async (req: Request, res: Response) => {
  try {
    const accountId = req.params.id;
    const account = await Account.findById(accountId);

    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }

    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch account" });
  }
};

export const createAccount = async (req: Request, res: Response) => {
  try {
    if (!req.body || !req.body.username) {
      return res.status(400).json({ error: "Username is required" });
    }

    const { username } = req.body;
    const newAccount = {
      username,
      funds: 0,
    };

    const account = await Account.create(newAccount);
    res.status(201).json(account);
  } catch (error) {
    res.status(500).json({ error: "Failed to create account" });
  }
};

export const updateAccount = async (req: Request, res: Response) => {
  try {
    const accountId = req.params.id;
    const account = await Account.findById(accountId);

    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }

    await account.updateOne(req.body);
    res.status(200).json({ message: "Account updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update account" });
  }
};

export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const accountId = req.params.id;
    const account = await Account.findById(accountId);

    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }

    await account.deleteOne();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete account" });
  }
};

export const getVipAccounts = async (req: Request, res: Response) => {
  try {
    const { amount } = req.query;
    const minAmount = amount ? Number(amount) : 0;

    if (isNaN(minAmount)) {
      return res
        .status(400)
        .json({ error: "Invalid amount. Must be a number." });
    }

    const vipAccounts = await Account.find({
      funds: { $gt: minAmount },
    }).select("-createdAt -updatedAt");

    res.status(200).json(vipAccounts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch VIP accounts" });
  }
};

export const getAccountByUsername = async (req: Request, res: Response) => {
  try {
    const username = req.params.username;
    const { currency } = req.query;

    const account = await Account.findOne({ username });

    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }

    if (currency === "usd") {
      const accountInUSD = {
        ...account.toObject(),
        funds: (account.funds || 0) * 3.25,
      };
      return res.status(200).json(accountInUSD);
    }

    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch account" });
  }
};
