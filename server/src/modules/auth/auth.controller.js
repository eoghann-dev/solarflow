import { changeUserPassword } from "./auth.service.js";

export async function loginUser(req, res, next) {
    try {

        return res.status(200).json({ message: "Login successful", user: req.user });
    } catch (error) {
        next(error);
    }
}

export async function logoutUser(req, res, next) {
    try {
        req.logout((err) => {
            if (err) {
                return next(err);
            }
            return res.status(200).json({ message: "Logout successful" });
        });
    } catch (error) {
        next(error);
    }
}

export async function getCurrentUser(req, res) {
    return res.status(200).json({ user: req.user });
}

export async function changePassword(req, res, next) {
    try {
        const result = await changeUserPassword(
            req.user.id,
            req.body.currentPassword,
            req.body.newPassword
        );

        return res.status(200).json({
            message: "Password changed successfully",
            user: result,
        });
    } catch (error) {
        next(error);
    }
}

export function requireAuth(req, res, next) {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    next();
}