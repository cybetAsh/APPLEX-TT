import fs from "fs";
import path from "path";

export default function handler(req, res) {
    const { file } = req.query;
    if(!file) return res.status(400).send("File missing");
    const filePath = path.join("/tmp", file);
    if(!fs.existsSync(filePath)) return res.status(404).send("File not found");

    res.setHeader("Content-Type", "video/mp4");
    res.setHeader("Content-Disposition", `attachment; filename=${file}`);
    fs.createReadStream(filePath).pipe(res);
}
