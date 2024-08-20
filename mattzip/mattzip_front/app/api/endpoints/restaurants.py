from fastapi import APIRouter, HTTPException
import requests
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

NAVER_CLIENT_ID = os.getenv("NAVER_CLIENT_ID")
NAVER_CLIENT_SECRET = os.getenv("NAVER_CLIENT_SECRET")

@router.get("/restaurants/")
async def search_restaurants(latitude: float, longitude: float, radius: float = 1.0):
    url = f"https://openapi.naver.com/v1/search/local.json?query=음식점&coordinate={longitude},{latitude}&radius={int(radius*1000)}"
    headers = {
        "X-Naver-Client-Id": NAVER_CLIENT_ID,
        "X-Naver-Client-Secret": NAVER_CLIENT_SECRET
    }
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json()['items']
    else:
        raise HTTPException(status_code=response.status_code, detail="Failed to fetch restaurants")