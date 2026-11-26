import bcrypt from "bcryptjs";

import {
  SESSION_NAME,
  cookieOptions
} from "../config/session.js";

// LOGIN

export async function login(req, res, next) {
  try {
    const { passcode } = req.body;

    if (
      typeof passcode !== "string" ||
      !passcode ||
      Buffer.byteLength(passcode, "utf8") > 72
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid passcode"
      });
    }

    const valid = await bcrypt.compare(
      passcode,
      process.env.PASSCODE_HASH
    );

    if (!valid) {
      return res.status(401).json({
        success: false,
        message: "Incorrect passcode"
      });
    }

    // Prevent session fixation

    await new Promise((resolve, reject) => {
      req.session.regenerate(error => {
        if (error) reject(error);
        else resolve();
      });
    });

    req.session.authenticated = true;

    req.session.loginAt = Date.now();

    await new Promise((resolve, reject) => {
      req.session.save(error => {
        if (error) reject(error);
        else resolve();
      });
    });

    return res.json({
      success: true,
      message: "Login successful",
      data: {
        authenticated: true
      }
    });

  } catch (error) {
    next(error);
  }
}

// CHECK SESSION

export function getSession(req, res) {
  res.set("Cache-Control", "no-store");

  return res.json({
    success: true,
    data: {
      authenticated:
        req.session?.authenticated === true
    }
  });
}

// LOGOUT

export function logout(req, res, next) {
  req.session.destroy(error => {
    if (error) {
      return next(error);
    }

    res.clearCookie(
      SESSION_NAME,
      cookieOptions
    );

    return res.json({
      success: true,
      message: "Logout successful"
    });
  });
}