/* backend/src/controllers/PasteController.js */
/**
 * @file backend/src/controllers/PasteController.js
 * Handles logic for creating and retrieving pastes.
 */

import { BaseController } from "./BaseController.js";
import { db } from "../db/Database.js";

export class PasteController extends BaseController {
  /**
   * Constructor
   */
  constructor() {
    super();
  }

  /**
   * Create a paste with content, plus basic rate-limiting.
   * @param {string} content - Paste content.
   * @param {string} ip - IP address of the user.
   * @returns {Object} Created paste record.
   */
  async createPaste(content, ip) {
    // Basic rate-limiting: check how many logs for this IP in the last 1 minute
    await db.execute(
      "INSERT INTO logs (ip, created_at) VALUES (?, NOW())",
      [ip]
    );

    const [rows] = await db.execute(
      "SELECT COUNT(*) as count FROM logs WHERE ip = ? AND created_at >= (NOW() - INTERVAL 1 MINUTE)",
      [ip]
    );

    if (rows[0].count > 5) {
      throw new Error("Rate limit exceeded. Try again later.");
    }

    // Create Paste
    await db.execute(
      "INSERT INTO pastes (content, created_at, ip) VALUES (?, NOW(), ?)",
      [content, ip]
    );
    const [paste] = await db.execute("SELECT LAST_INSERT_ID() as id");
    const pasteId = paste[0].id;

    // Return the created record
    const [resultRows] = await db.execute(
      "SELECT * FROM pastes WHERE id = ?",
      [pasteId]
    );
    return resultRows[0];
  }

  /**
   * Retrieve a paste by ID. Increase view count.
   * @param {number} id - The paste ID.
   * @returns {Object} Paste record.
   */
  async getPaste(id) {
    // Increase views
    await db.execute("UPDATE pastes SET views = views + 1 WHERE id = ?", [id]);

    // Fetch record
    const [rows] = await db.execute("SELECT * FROM pastes WHERE id = ?", [id]);
    if (!rows.length) {
      throw new Error("Paste not found.");
    }
    return rows[0];
  }
}

// Return a proxy-wrapped instance for error handling
export const pasteController = BaseController.createProxy(new PasteController());
