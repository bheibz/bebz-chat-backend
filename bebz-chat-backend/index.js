const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("🔥 Bebz-GPT Backend is Live!");
});

app.post("/chat", (req, res) => {
  const prompt = req.body.prompt;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt kosong" });
  }

  // Dummy balasan
  res.json({ reply: `Hai! Kamu bilang: ${prompt}` });
});

app.listen(port, () => {
  console.log(`🚀 Server Bebz-GPT jalan di http://localhost:${port}`);
});
