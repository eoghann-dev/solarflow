import { Router } from "express";
import { passport } from "./passport.js";

import {
    changePassword,
    getCurrentUser,
    loginUser,
    logoutUser,
    requireAuth,
} from "./auth.controller.js";

const router = Router();

router.post(
    "/login",
    passport.authenticate("local"),
    loginUser,
);
router.post("/logout", requireAuth, logoutUser);
router.get("/me", requireAuth, getCurrentUser);
router.patch("/password", requireAuth, changePassword);

export default router;