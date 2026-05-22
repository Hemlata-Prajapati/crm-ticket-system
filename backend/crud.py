from sqlalchemy.orm import Session
from models import Ticket
from schemas import TicketCreate
import random

def generate_ticket_id():
    number = random.randint(100, 999)
    return f"TKT-{number}"

def create_ticket(db: Session, ticket: TicketCreate):

    new_ticket = Ticket(
        ticket_id=generate_ticket_id(),
        customer_name=ticket.customer_name,
        customer_email=ticket.customer_email,
        subject=ticket.subject,
        description=ticket.description
    )

    db.add(new_ticket)
    db.commit()
    db.refresh(new_ticket)

    return new_ticket

def get_tickets(db: Session, search: str = None, status: str = None):

    query = db.query(Ticket)

    # SEARCH
    if search:
        query = query.filter(
            Ticket.customer_name.contains(search) |
            Ticket.subject.contains(search) |
            Ticket.customer_email.contains(search)
        )

    # FILTER
    if status:
        query = query.filter(Ticket.status == status)

    return query.all()

def get_ticket_by_id(db: Session, ticket_id: str):
    return db.query(Ticket).filter(Ticket.ticket_id == ticket_id).first()

def update_ticket_status(db: Session, ticket_id: str, status: str):

    ticket = db.query(Ticket).filter(Ticket.ticket_id == ticket_id).first()

    if ticket:
        ticket.status = status
        db.commit()
        db.refresh(ticket)

    return ticket