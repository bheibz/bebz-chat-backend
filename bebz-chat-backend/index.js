const express = require("express");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("🔥 Bebz-GPT Terhubung ke HuggingFace Space!");
});

app.post("/chat", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt kosong" });
  }

  try {
    const response = await axios.post("https://bebgpt.hf.space/api/predict", {
      data: [
        prompt,
        "You are a friendly Chatbot.",
        512,
        0.7,
        0.95
      ]
    });

    const hasil = response.data?.data?.[0] || "AI tidak memberikan respon.";
    res.json({ response: hasil });

  } catch (err) {
    console.error("❌ Gagal konek ke HuggingFace Space:", err?.response?.data || err.message);
    res.status(500).json({ error: "Gagal ambil respon dari HuggingFace Space" });
  }
});

app.listen(port, () => {
  console.log(`🚀 Bebz-GPT jalan di http://localhost:${port}`);
});
