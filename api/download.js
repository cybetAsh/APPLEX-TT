import { exec } from "child_process";
import fs from "fs";
import path from "path";

export default async function handler(req, res) {
    const { url } = req.query;
    if(!url) return res.status(400).json({ error: "URL required" });

    const fileName = `video_${Date.now()}.mp4`;
    const filePath = path.join("/tmp", fileName);

    const cmd = `yt-dlp -f mp4 -o "${filePath}" --no-check-certificate "${url}"`;

    exec(cmd, (err, stdout, stderr) => {
        if(err) return res.status(500).json({ error: stderr || err.message });
        res.json({ download: `/api/download-file?file=${fileName}` });
    });
         }
