const express = require("express");
const router = express.Router();
const { Configuration, PlaidApi, PlaidEnvironments } = require("plaid");

class PlaidController {
  constructor() {
    const configuration = new Configuration({
      basePath: PlaidEnvironments.sandbox,
      baseOptions: {
        headers: {
          "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
          "PLAID-SECRET": process.env.PLAID_SECRET,
        },
      },
    });
    this.plaidClient = new PlaidApi(configuration);
  }

  async createLinkToken(req, res) {
    try {
      const { userId } = req.body;
      // TODO: Implement link token generation
      res.status(200).json({ message: "Link token created" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async handlePlaidCallback(req, res) {
    try {
      const { publicToken } = req.body;
      // TODO: Implement public token exchange
      // TODO: Store access token
      // TODO: Fetch account details
      res.status(200).json({ message: "Bank account connected successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

const plaidController = new PlaidController();

router.post("/create-link-token", plaidController.createLinkToken);
router.post("/plaid-callback", plaidController.handlePlaidCallback);

module.exports = router;
