import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/api";
import "../styles/Home.css";

function TicketDetails() {

  const { ticket_id } = useParams();

  const [ticket, setTicket] = useState(null);

  const fetchTicket = async () => {

    try {

      const response = await API.get(
        `/api/tickets/${ticket_id}`
      );

      setTicket(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    const loadTicket = async () => {
      await fetchTicket();
    };

    loadTicket();

  }, []);

  if (!ticket) {

    return <h2>Loading...</h2>;

  }

  return (

    <div className="container">

      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "#2b5ce6",
          fontWeight: "bold"
        }}
      >
        ← Back to Home
      </Link>

      <div
        className="ticket-card"
        style={{
          marginTop: "20px",
          maxWidth: "600px"
        }}
      >

        <h2>{ticket.subject}</h2>

        <p>
          <strong>Ticket ID</strong>
          <span className="ticket-id">
            #{ticket.ticket_id}
          </span>
        </p>

        <p>
          <strong>Name</strong>
          {ticket.customer_name}
        </p>

        <p>
          <strong>Email</strong>
          {ticket.customer_email}
        </p>

        <p>
          <strong>Description</strong>
          {ticket.description}
        </p>

        <p>
          <strong>Status</strong>

          <span
            className={
              ticket.status === "Closed"
                ? "status-closed"
                : "status-open"
            }
          >
            {ticket.status}
          </span>

        </p>

      </div>

    </div>

  );

}

export default TicketDetails;