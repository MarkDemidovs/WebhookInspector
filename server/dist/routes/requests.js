"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const requests_1 = require("../controllers/requests");
const router = (0, express_1.Router)();
router.post("/:id/share", auth_1.requireAuth, requests_1.shareRequests);
router.get("/share/:token", requests_1.getSharedRequests);
exports.default = router;
