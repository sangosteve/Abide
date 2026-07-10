import { Router } from "express";
import multer from "multer";
import path from "node:path";
import fs from "node:fs";

const UPLOADS_DIR = path.resolve(process.cwd(), "uploads");
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .slice(0, 40);
    cb(null, `${Date.now()}-${base}${ext}`);
  },
});

const ALLOWED_MIME: Record<string, boolean> = {
  "image/jpeg": true,
  "image/png": true,
  "image/webp": true,
  "image/gif": true,
  "video/mp4": true,
  "video/quicktime": true,
  "video/webm": true,
  "audio/mpeg": true,
  "audio/mp4": true,
  "audio/wav": true,
  "audio/x-m4a": true,
  "application/pdf": true,
};

const upload = multer({
  storage,
  limits: { fileSize: 500 * 1024 * 1024 }, // 500 MB
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_MIME[file.mimetype]) return cb(null, true);
    cb(new Error(`Unsupported file type: ${file.mimetype}`));
  },
});

const router = Router();

/**
 * POST /api/upload
 * Accepts a single file as multipart/form-data field "file".
 * Returns { url, filename, size, mimetype }
 */
router.post("/", upload.single("file"), (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: "No file received" });
    return;
  }

  // Build the public serving URL. In Replit the API is proxied at /api/*
  // so the media URL uses the same base path.
  const proto = req.headers["x-forwarded-proto"] ?? req.protocol;
  const host  = req.headers["x-forwarded-host"] ?? req.get("host") ?? "localhost";
  const mediaUrl = `${proto}://${host}/api/media/${req.file.filename}`;

  res.json({
    url: mediaUrl,
    filename: req.file.filename,
    size: req.file.size,
    mimetype: req.file.mimetype,
  });
});

export default router;
