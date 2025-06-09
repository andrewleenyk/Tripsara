const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

class InviteController {
  async sendInvite(req, res) {
    try {
      const { tripId } = req.params;
      const { invitees } = req.body;
      // TODO: Generate invite links
      // TODO: Send notifications
      // TODO: Create pending invites
      res.status(200).json({ message: "Invites sent successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async acceptInvite(req, res) {
    try {
      const { inviteId } = req.params;
      // TODO: Validate invite
      // TODO: Add user to trip
      // TODO: Update invite status
      res.status(200).json({ message: "Invite accepted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async declineInvite(req, res) {
    try {
      const { inviteId } = req.params;
      // TODO: Update invite status
      res.status(200).json({ message: "Invite declined successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

const inviteController = new InviteController();

router.post("/:tripId/invite", inviteController.sendInvite);
router.post("/invite/:inviteId/accept", inviteController.acceptInvite);
router.post("/invite/:inviteId/decline", inviteController.declineInvite);

module.exports = router;
