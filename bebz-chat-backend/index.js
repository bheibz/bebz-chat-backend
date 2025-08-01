const axios = require("axios");
const express = require("express");
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
    const response = await axios.post(
      "https://bebz-gpt.hf.space/run/predict",
      {
        data: [prompt, "You are a helpful assistant.", 512, 0.7, 0.95]
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const result = response.data && response.data.data
      ? response.data.data[0]
      : "AI tidak merespon.";

    res.json({ response: result });

  } catch (err) {
    console.error("❌ Gagal:", err.message);
    res.status(500).json({ error: "Gagal ambil respon dari HuggingFace Space", detail: err.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server jalan di http://localhost:${port}`);
});
