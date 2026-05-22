import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";
import "../styles/Home.css";

function Home() {

  // STATES
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  // const [isLight, setIsLight] = useState(true);
  const [isLight, setIsLight] = useState(false);

  const totalTickets = tickets.length;

  const openTickets = tickets.filter(
    (ticket) => ticket.status === "Open"
  ).length;

  const closedTickets = tickets.filter(
    (ticket) => ticket.status === "Closed"
  ).length;

  const inProgressTickets = tickets.filter(
    (ticket) => ticket.status === "In Progress"
  ).length;

  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    subject: "",
    description: ""
  });

  // FETCH TICKETS
  const fetchTickets = async () => {

    try {

      const response = await API.get("/api/tickets", {
        params: {
          search: search,
          status: status
        }
      });

      setTickets(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  // LOAD TICKETS
  useEffect(() => {

    const loadTickets = async () => {

      await fetchTickets();

    };

    loadTickets();

  }, [search, status]);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  // CREATE TICKET
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post("/api/tickets", formData);

      alert("Ticket Created Successfully!");

      // REFRESH TICKETS
      fetchTickets();

      // CLEAR FORM
      setFormData({
        customer_name: "",
        customer_email: "",
        subject: "",
        description: ""
      });

    } catch (error) {

      console.log(error);
      alert("Error creating ticket");

    }

  };

  // UPDATE STATUS
  const updateStatus = async (ticket_id, newStatus) => {

    try {

      await API.put(`/api/tickets/${ticket_id}`, {
        status: newStatus
      });

      fetchTickets();

    } catch (error) {

      console.log(error);

    }

  };

  const toggleTheme = () => {
    setIsLight((prev) => {
      const newTheme = !prev;

      if (newTheme) {
        document.body.classList.add("light");
      } else {
        document.body.classList.remove("light");
      }

      return newTheme;
    });
  };

  useEffect(() => {

    document.body.classList.add("light");

  }, []);

  return (

    <div className="container">

      <div className="title-bar">
        <h1 className="title">CRM Ticket System</h1>
        <label className="theme-toggle">
          <input type="checkbox" onChange={toggleTheme} checked={isLight} />
          <span className="toggle-track">
            <span className="toggle-thumb" />
          </span>
        </label>
      </div>

      {/* STATS */}
      <div className="stats-container">

        <div className="stat-card">
          <h3>Total Tickets</h3>
          <p>{totalTickets}</p>
        </div>

        <div className="stat-card">
          <h3>Open Tickets</h3>
          <p>{openTickets}</p>
        </div>

        <div className="stat-card">
          <h3>In Progress</h3>
          <p>{inProgressTickets}</p>
        </div>

        <div className="stat-card">
          <h3>Closed Tickets</h3>
          <p>{closedTickets}</p>
        </div>

      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="form-container"
      >

        <div className="form-row">

          <input
            type="text"
            name="customer_name"
            placeholder="Customer Name"
            value={formData.customer_name}
            onChange={handleChange}
            className="form-input"
          />

          <input
            type="email"
            name="customer_email"
            placeholder="Customer Email"
            value={formData.customer_email}
            onChange={handleChange}
            className="form-input"
          />

        </div>

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          className="form-input"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="form-textarea"
        />

        <button
          type="submit"
          className="create-btn"
        >
          Create Ticket
        </button>

      </form>

      {/* SEARCH + FILTER */}
      <div className="filter-container">

        <input
          type="text"
          placeholder="Search tickets…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="filter-select"
        >
          <option value="">All Status</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>

      </div>

      <hr />

      {/* TICKET LIST */}
      <h2>All Tickets</h2>

      <div className="ticket-grid">

        {tickets.length === 0 ? (

          <p>No tickets found.</p>

        ) : (

          tickets.map((ticket) => (

            <div
              key={ticket.ticket_id}
              className="ticket-card"
            >

              <h3>{ticket.subject}</h3>
              <Link
                to={`/ticket/${ticket.ticket_id}`}
                className="details-btn"
              >
                View Details
              </Link>
              <p>
                <strong>Ticket ID</strong>
                <span className="ticket-id">#{ticket.ticket_id}</span>
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
                    : ticket.status === "In Progress"
                    ? "status-progress"
                    : "status-open"
                }
                >
                  {ticket.status}
                </span>
              </p>

              {ticket.status === "Open" && (
                <>
                  <button onClick={() => updateStatus(ticket.ticket_id, "In Progress")} className="progress-btn">
                    Mark In Progress
                  </button>
                  <button onClick={() => updateStatus(ticket.ticket_id, "Closed")} className="close-btn">
                    Mark as Closed
                  </button>
                </>
              )}
              {ticket.status === "In Progress" && (
                <button onClick={() => updateStatus(ticket.ticket_id, "Closed")} className="close-btn">
                  Mark as Closed
                </button>
              )}

            </div>

          ))

        )}

      </div>

    </div>

  );

}

export default Home;
