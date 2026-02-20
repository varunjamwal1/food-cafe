const express = require("express");
const router = express.Router();

const {
  addTable,
  getTable,
  updateTable
} = require("../controllers/tableControllwe");

const { isVerifiedUser } = require("../middleware/tokenVerification");

// CREATE TABLE
router.post("/", isVerifiedUser, addTable);

// GET ALL TABLES
router.get("/", isVerifiedUser, getTable);

// UPDATE TABLE
router.put("/:id", isVerifiedUser, updateTable);

module.exports = router;
