const express = require("express");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("🔥 Bebz-GPT Backend is Live with HuggingFace AI!");
});

app.post("/chat", async (req, res) => {
  const prompt = req.body.prompt;
  const hf_token = process.env.HF_API_KEY;
  const model = "HuggingFaceH4/zephyr-7b-beta"; // bisa diganti sesuai kebutuhan

  if (!prompt) {
    return res.status(400).json({ error: "Prompt kosong" });
  }

  try {
    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${model}`,
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${hf_token}`,
          "Content-Type": "application/json"
        },
        timeout: 60000
      }
    );

    const hasil = response.data?.[0]?.generated_text || "Model tidak memberikan jawaban.";
    res.json({ response: hasil });

  } catch (err) {
    console.error("❌ Gagal konek ke Hugging Face:", err.response?.data || err.message);
    res.status(500).json({ error: "Gagal ambil respon dari model AI Hugging Face" });
  }
});

app.listen(port, () => {
  console.log(`🚀 Bebz-GPT dengan AI aktif di http://localhost:${port}`);
});
