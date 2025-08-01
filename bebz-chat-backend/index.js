const express = require("express");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 8080;
f
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
  "https://bebgpt.hf.space/chat",
  {
    message: prompt,
    system_message: "You are a friendly Chatbot.",
    max_tokens: 512,
    temperature: 0.7,
    top_p: 0.95,
  },
  {
    headers: {
      "Content-Type": "application/json",
    },
  }
);


    const hasil = response.data && response.data[0]
      ? response.data[0]
      : "AI tidak memberikan respon.";
    
    res.json({ response: hasil });

  } catch (err) {
    console.error("❌ Error detail:", {
      message: err.message,
      status: err.response && err.response.status,
      data: err.response && err.response.data,
    });

    res.status(500).json({
      error: "Gagal ambil respon dari HuggingFace Space",
      detail: err.response ? err.response.data : err.message
    });
  }
});

app.listen(port, () => {
  console.log(`🚀 Bebz-GPT jalan di http://localhost:${port}`);
});
