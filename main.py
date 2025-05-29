from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import base64
from io import BytesIO
from PIL import Image, ImageDraw
import uvicorn

app = FastAPI()

# 允許前端跨域存取
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 輸入模型格式
class PromptInput(BaseModel):
    prompt: str

# API 端點：產生圖像
@app.post("/generate")
async def generate_image(data: PromptInput):
    prompt = data.prompt

    # 模擬圖像生成：灰底 + prompt 字樣
    img = Image.new("RGB", (600, 600), color=(240, 240, 240))
    draw = ImageDraw.Draw(img)
    display_text = prompt[:30] + "..." if len(prompt) > 30 else prompt
    draw.text((10, 10), display_text, fill=(80, 80, 80))

    # 圖像轉 base64 字串
    buffer = BytesIO()
    img.save(buffer, format="PNG")
    img_str = base64.b64encode(buffer.getvalue()).decode("utf-8")

    return {"image_base64": img_str}

# 🔧 Railway 會依照這個啟動設定來綁定正確 port
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)
