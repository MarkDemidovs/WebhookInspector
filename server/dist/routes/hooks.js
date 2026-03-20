"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hooks_1 = require("../controllers/hooks");
const router = (0, express_1.Router)();
router.all("/:slug", hooks_1.captureRequest);
exports.default = router;
