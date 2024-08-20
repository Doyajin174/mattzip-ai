<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ restaurant.name }} - 상세 정보</title>
    <link rel="stylesheet" href="{{ url_for('static', path='/css/style.css') }}">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css" />
</head>
<body>
    <header>
        <div class="header-content">
            <h1><a href="/">MattZip</a></h1>
        </div>
    </header>
    
    <div class="container">
        <div class="restaurant-header">
            <h2 class="restaurant-title">{{ restaurant.name }}</h2>
            <p class="restaurant-category">{{ restaurant.category }}</p>
        </div>
        
        <div class="restaurant-info">
            <div class="image-slider">
                <div class="swiper">
                    <div class="swiper-wrapper">
                        {% for image in restaurant.images %}
                        <div class="swiper-slide">
                            <img src="{{ image }}" alt="{{ restaurant.name }}">
                        </div>
                        {% endfor %}
                    </div>
                    <div class="swiper-pagination"></div>
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-button-next"></div>
                </div>
            </div>
            
            <div class="info-section">
                <div class="info-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <p>{{ restaurant.address }}</p>
                </div>
                <div class="info-item">
                    <i class="fas fa-phone"></i>
                    <p>{{ restaurant.phone }}</p>
                </div>
                <a href="https://map.naver.com/v5/search/{{ restaurant.name }} {{ restaurant.address }}" target="_blank" class="naver-map-btn">네이버 지도에서 보기</a>
            </div>
        </div>

        <div class="content-section">
            <div id="ai-summary" class="summary-section">
                <h3>AI 요약</h3>
                <p id="ai-summary-content">로딩 중...</p>
            </div>

            <div id="current-status" class="status-section">
                <h3>현재 상황</h3>
                <p>현재 방문객 수: <span id="visitor-count">0</span></p>
                <button id="check-in">방문 체크인</button>
            </div>

            <div id="reviews" class="reviews-section">
                <h3>리뷰</h3>
                <div id="reviews-list">
                    <!-- 리뷰 목록이 여기에 들어갑니다 -->
                </div>
                <form id="review-form" class="review-form">
                    <textarea name="review" placeholder="리뷰를 작성해주세요"></textarea>
                    <button type="submit">리뷰 작성</button>
                </form>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js"></script>
    <script src="https://kit.fontawesome.com/your-fontawesome-kit.js" crossorigin="anonymous"></script>
    <script src="{{ url_for('static', path='/js/restaurant_detail.js') }}"></script>
</body>
</html>