import express from "express";
import {
  getAllAccounts,
  getAccountById,
  createAccount,
  updateAccount,
  deleteAccount,
  getVipAccounts,
  getAccountByUsername,
} from "./accounts.controllers";

const router = express.Router();

router.get("/", getAllAccounts);
router.get("/username/:username", getAccountByUsername);
router.get("/vip", getVipAccounts);
router.get("/:id", getAccountById);
router.post("/", createAccount);
router.put("/:id", updateAccount);
router.delete("/:id", deleteAccount);

export default router;
