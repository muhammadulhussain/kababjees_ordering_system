from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.menu_items import MenuItem
from app.schemas.menu_items import MenuItemCreate, MenuItemOut

router = APIRouter(prefix="/menu", tags=["Menu"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=MenuItemOut)
def create_menu_item(item: MenuItemCreate, db: Session = Depends(get_db)):
    db_item = MenuItem(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.get("/", response_model=list[MenuItemOut])
def get_menu(db: Session = Depends(get_db)):
    items = db.query(MenuItem).filter(MenuItem.is_active==True).all()
    return items
