import { prisma } from "../../../lib/prisma.js";
import bcrypt from "bcryptjs";

export async function findUserByUsername(username) {
    if (!username) return null;

    const user = await prisma.user.findUnique({
        where: { username: username },
    });

    return user;
}

export async function findUserById(id) {
    if(!id) return null;

    const user = await prisma.user.findUnique({
        where: { id: id },
    });

    return user;
}

export async function verifyPassword(plainPassword, passwordHash) {
    if (!plainPassword || !passwordHash) return false;

    const isMatch = await bcrypt.compare(plainPassword, passwordHash); 
    return isMatch;
}

export async function changeUserPassword(userId, currentPassword, newPassword) {
    const validatedPassword = validatePassword(newPassword);

    if (currentPassword === validatedPassword) {
        throw new Error("New password must differ from the current password");  
    }

    const user = await findUserById(userId);
    if (! user) throw new Error("User not found");
    if (!(await verifyPassword(currentPassword, user.passwordHash))) throw new Error("Incorrect Password");

    const newPasswordHash = await hashPassword(newPassword);
    const updateUser = await prisma.user.update({
        where: { id: userId },
        data: { passwordHash: newPasswordHash },
    });

    return getSafeUser(updateUser);
}

export async function hashPassword(plainPassword) {
    if (!plainPassword) return null;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(plainPassword, saltRounds);

    return passwordHash;
}

export async function createInitialAdmin(username, password) {
    const validatedUsername = validateUsername(username);
    const validatedPassword = validatePassword(password);

    const passwordHash = await hashPassword(validatedPassword);

    const user = await prisma.user.create({
        data: {
            username: validatedUsername,
            passwordHash,
        },
    });

    return getSafeUser(user);
}

export function getSafeUser(user) {
    if (!user) return null;

    return {
        id: user.id,
        username: user.username,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
}

export function validateUsername(username) {
    if (typeof username !== "string") {
        throw new Error("Invalid username");
    }

    const normalizedUsername = username.trim();

    if (normalizedUsername.length < 3) {
        throw new Error("Username must be at least 3 characters");
    }

    if (normalizedUsername.length > 30) {
        throw new Error("Username must be 30 characters or fewer");
    }

    if (!/^[a-zA-Z0-9._-]+$/.test(normalizedUsername)) {
        throw new Error(
            "Username may contain only letters, numbers, dots, underscores, and hyphens",
        );
    }

    return normalizedUsername;
}

export function validatePassword(password) {
    if (typeof password !== "string") {
        throw new Error("Invalid password");
    }

    if (password.length < 8) {
        throw new Error("Password must be at least 8 characters");
    }

    if (password.length > 72) {
        throw new Error("Password must be 72 characters or fewer");
    }

    if (password.trim().length === 0) {
        throw new Error("Password cannot contain only whitespace");
    }

    return password;
}