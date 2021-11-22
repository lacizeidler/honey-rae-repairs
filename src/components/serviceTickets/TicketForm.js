import React, { useState } from "react"
import { useHistory } from "react-router";

export const TicketForm = () => {
    const [ticket, update] = useState({
        description: "",
        emergency: false
    });


    const history = useHistory()

    const SubmitTicket = (event) => {
        event.preventDefault()
        const newTicket = {
            description: ticket.description,
            emergency: ticket.emergency,
            customerId: parseInt(localStorage.getItem("honey_customer")),
            employeeId: 0,
            dateCompleted: ""
        }
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTicket)
        }
        return fetch("http://localhost:8088/serviceTickets", fetchOption)
        .then(response => response.json())
        .then(() => {
            history.push("/serviceTickets")
        })
    }

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                    onChange={
                        (event) => {
                            const copy = {...ticket}
                            copy.description = event.target.value
                            update(copy)
                        }
                    }
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brief description of problem"
                         />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input type="checkbox"
                     onChange={
                        (event) => {
                            const copy = {...ticket}
                            copy.emergency = event.target.checked
                            update(copy)
                        }
                    }
                         />
                </div>
            </fieldset>
            <button className="btn btn-primary" onClick={SubmitTicket}>
                Submit Ticket
            </button>
        </form>
    )
}