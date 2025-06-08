
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.todos import router as todos_router
from database import init_db

app = FastAPI(title="Todo API", version="1.0.0")

# Configure CORS
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173", "http://localhost:8080" ,"https://anshikatodo.netlify.app/"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Initialize database
init_db()

# Include routers
app.include_router(todos_router, prefix="/todos", tags=["todos"])

@app.get("/")
def read_root():
    return {"message": "Todo API is running!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
