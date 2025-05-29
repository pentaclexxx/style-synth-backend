from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import base64
from io import BytesIO
from PIL import Image, ImageDraw

app = FastAPI()

# 允許前端跨域連線
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class PromptInput(BaseModel):
    prompt: str

@app.post("/generate")
async def generate_image(data: PromptInput):
    prompt = data.prompt

    # 模擬產生灰底圖片 + prompt 前幾字作為文字
    img = Image.new("RGB", (600, 600), color=(240, 240, 240))
    img_draw = ImageDraw.Draw(img)
    return_text = prompt[:30] + "..." if len(prompt) > 30 else prompt
    img_draw.text((10, 10), return_text, fill=(80, 80, 80))

    # 圖片轉 base64 字串
    buffered = BytesIO()
    img.save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")

    return {"image_base64": img_str}
