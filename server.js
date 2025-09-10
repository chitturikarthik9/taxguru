const path = require("path");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple API routes
app.get("/api/health", (req, res) => {
	res.json({ status: "ok", uptimeSeconds: Math.round(process.uptime()) });
});

app.post("/api/echo", (req, res) => {
	res.json({ echo: req.body });
});

// Serve static assets from /public
app.use(express.static(path.join(__dirname, "public")));

// Root route serves index.html
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
});

