from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routers import auth, customers, orders, menu, admin

# Create tables if not exists
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Kababjees Food Ordering Backend",
    version="1.0.0",
)

# -------- CORS Middleware --------
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------- Routers --------
app.include_router(auth.router)
app.include_router(customers.router)
app.include_router(orders.router)
app.include_router(menu.router)
app.include_router(admin.router)
