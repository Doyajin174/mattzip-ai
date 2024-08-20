# Perplexica API Documentation

## Base URL
`http://your-api-base-url.com/api`

## Authentication
All API requests require an API key to be included in the header:
`X-API-Key: your-api-key`

## Endpoints

### Web Search
- **URL**: `/web-search`
- **Method**: `POST`
- **Body**:
  {
    "query": "Your search query",
    "chat_history": [
      {"role": "user", "content": "Previous user message"},
      {"role": "assistant", "content": "Previous assistant response"}
    ]
  }
- **Response**:
  {
    "status": "success",
    "data": {
      "response": "Search result..."
    }
  }

### Image Search
- **URL**: `/image-search`
- **Method**: `POST`
- **Body**: (Same as Web Search)
- **Response**:
  {
    "status": "success",
    "data": {
      "images": [
        {
          "img_src": "image_url",
          "url": "source_url",
          "title": "image_title"
        }
      ]
    }
  }

### Video Search
- **URL**: `/video-search`
- **Method**: `POST`
- **Body**: (Same as Web Search)
- **Response**:
  {
    "status": "success",
    "data": {
      "videos": [
        {
          "img_src": "thumbnail_url",
          "url": "video_url",
          "title": "video_title",
          "iframe_src": "embed_url"
        }
      ]
    }
  }

### YouTube Search
- **URL**: `/youtube-search`
- **Method**: `POST`
- **Body**: (Same as Web Search)
- **Response**:
  {
    "status": "success",
    "data": {
      "response": "YouTube search result..."
    }
  }

## Error Responses
In case of an error, the API will respond with:
{
  "status": "error",
  "message": "Error description"
}