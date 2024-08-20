from fastapi import FastAPI, Request, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import os
from dotenv import load_dotenv
from pathlib import Path
import json
from urllib.parse import quote
import logging

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / '.env')

logging.basicConfig(level=logging.DEBUG)

app = FastAPI()

static_dir = BASE_DIR / "static"
templates_dir = BASE_DIR / "templates"

app.mount("/static", StaticFiles(directory=static_dir), name="static")
templates = Jinja2Templates(directory=templates_dir)

NAVER_CLIENT_ID = os.getenv("NAVER_CLIENT_ID")
NAVER_CLIENT_SECRET = os.getenv("NAVER_CLIENT_SECRET")

@app.middleware("http")
async def log_requests(request: Request, call_next):
    logging.info(f"Requested path: {request.url.path}")
    response = await call_next(request)
    logging.info(f"Response status: {response.status_code}")
    return response

@app.get("/")
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request, "naver_client_id": NAVER_CLIENT_ID})

@app.get("/api/restaurants")
async def get_restaurants():
    json_file = BASE_DIR / "restaurants.json"
    with open(json_file, 'r', encoding='utf-8') as file:
        restaurants = json.load(file)
    
    for i, restaurant in enumerate(restaurants):
        restaurant['id'] = str(i)  # 각 음식점에 id 추가
        valid_images = []
        for img_path in restaurant.get('images', []):
            full_path = BASE_DIR / img_path.lstrip('/')
            if os.path.isfile(full_path):
                valid_images.append(img_path)
            else:
                logging.warning(f"Image not found: {full_path}")
        restaurant['images'] = valid_images
        logging.debug(f"Restaurant: {restaurant['name']}, Images: {restaurant['images']}")
    
    return restaurants

@app.get("/restaurant/{id}")
async def restaurant_detail(request: Request, id: str):
    json_file = BASE_DIR / "restaurants.json"
    with open(json_file, 'r', encoding='utf-8') as file:
        restaurants = json.load(file)
    
    for i, r in enumerate(restaurants):
        r['id'] = str(i)  # 각 음식점에 id 추가
    
    restaurant = next((r for r in restaurants if r['id'] == id), None)
    if restaurant is None:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    
    return templates.TemplateResponse("restaurant_detail.html", {"request": request, "restaurant": restaurant})

def check_file_structure():
    static_path = BASE_DIR / "static" / "사진"
    logging.info(f"Checking static files in: {static_path}")
    for root, dirs, files in os.walk(static_path):
        logging.info(f"Checking directory: {root}")
        for file in files:
            logging.info(f"Found file: {os.path.join(root, file)}")

if __name__ == "__main__":
    logging.info(f"Base directory: {BASE_DIR}")
    logging.info(f"Static directory: {static_dir}")
    check_file_structure()
    import uvicorn
    uvicorn.run("app.main:app", host="127.0.0.1", port=9500, reload=True)