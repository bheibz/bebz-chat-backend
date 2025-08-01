from gradio_client import Client
import sys
import json

# Ganti nama Space sesuai milikmu
client = Client("bebz/bebgpt")  # contoh: "username/namaspace"

# Ambil prompt dari argumen
prompt = sys.argv[1]

# Panggil API HuggingFace Space dengan parameter yang sesuai
result = client.predict(
    prompt,                             # message (dari Textbox)
    "You are a friendly assistant.",    # system_message (default)
    512,                                # max_tokens (slider)
    0.7,                                # temperature (slider)
    0.95,                               # top_p (slider)
    api_name="/predict"                 # sesuai info dari Hugging Face
)

# Keluarkan dalam bentuk JSON untuk dibaca oleh backend Node.js
print(json.dumps({"response": result}))
