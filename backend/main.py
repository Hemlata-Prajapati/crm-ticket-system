from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

from database import engine, SessionLocal
from models import Base
import crud
import schemas

Base.metadata.create_all(bind=engine)

app = FastAPI()

# Database Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def home():
    return {"message": "CRM Ticket System Running"}


# GET ALL + SEARCH + FILTER
@app.get("/api/tickets", response_model=list[schemas.TicketResponse])
def get_all_tickets(
    search: str = None,
    status: str = None,
    db: Session = Depends(get_db)
):
    return crud.get_tickets(db, search, status)


# CREATE TICKET
@app.post("/api/tickets", response_model=schemas.TicketResponse)
def create_ticket(ticket: schemas.TicketCreate, db: Session = Depends(get_db)):
    return crud.create_ticket(db, ticket)


# GET SINGLE TICKET
@app.get("/api/tickets/{ticket_id}", response_model=schemas.TicketResponse)
def get_ticket(ticket_id: str, db: Session = Depends(get_db)):
    return crud.get_ticket_by_id(db, ticket_id)


# UPDATE TICKET STATUS
@app.put("/api/tickets/{ticket_id}", response_model=schemas.TicketResponse)
def update_ticket(
    ticket_id: str,
    ticket_update: schemas.TicketUpdate,
    db: Session = Depends(get_db)
):
    return crud.update_ticket_status(db, ticket_id, ticket_update.status)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)