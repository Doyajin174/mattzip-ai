from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from .models import Restaurant, Review, ReviewSummary
import requests
from bs4 import BeautifulSoup
from django.views.decorators.csrf import csrf_exempt
import json

def index(request):
    return render(request, 'index.html')

def summarize_reviews(reviews):
    # 여기에 실제 요약 로직을 구현합니다. 
    # 예시로 간단한 요약만 수행합니다.
    return "리뷰 요약: " + " ".join(review.content[:20] for review in reviews[:5])

@csrf_exempt
def get_restaurant_summary(request, restaurant_id):
    restaurant = get_object_or_404(Restaurant, id=restaurant_id)
    
    # 기존 요약이 있는지 확인
    summary, created = ReviewSummary.objects.get_or_create(restaurant=restaurant)
    
    if created or not summary.summary:
        # 새로운 요약 생성
        reviews = restaurant.reviews.all()
        summary.summary = summarize_reviews(reviews)
        summary.save()
    
    return JsonResponse({"summary": summary.summary})

@csrf_exempt
def collect_reviews(request, restaurant_id):
    if request.method == 'POST':
        restaurant = get_object_or_404(Restaurant, id=restaurant_id)
        data = json.loads(request.body)
        url = data.get('url')
        
        # 여기에 실제 리뷰 수집 로직을 구현합니다.
        # 예시로 간단한 크롤링만 수행합니다.
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        reviews = soup.find_all('div', class_='review')
        
        for review in reviews[:5]:  # 예시로 5개만 저장
            Review.objects.create(restaurant=restaurant, content=review.text)
        
        return JsonResponse({"message": "Reviews collected successfully"})
    
    return JsonResponse({"error": "Invalid request method"}, status=400)