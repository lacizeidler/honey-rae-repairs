import { useParams, useHistory } from "react-router"
import { useEffect, useState } from "react/cjs/react.development"

export const CreateTicket = () => {
    const { ticketId } = useParams()
    const [tickets, modifyTickets] = useState([])
    const [employees, modifyEmployees] = useState([])
    const history = useHistory()

    useEffect(
        () => {
            fetch(`http://localhost:8088/serviceTickets/${ticketId}?_expand=customer&_expand=employee`)
                .then(res => res.json())
                .then(modifyTickets)
        },
        [ ticketId ]  // Above function runs when the value of ticketId change
    )

    useEffect(
        () => {
            return fetch("http://localhost:8088/employees")
            .then(response => response.json())
            .then(modifyEmployees)
        },
        []
    )
    const assignEmployee = (changeEvent) => {
        const updateTicket = {
                description: tickets.description,
                emergency: tickets.emergency,
                customerId: parseInt(localStorage.getItem("honey_customer")),
                employeeId: parseInt(changeEvent.target.value),
                dateCompleted: tickets.dateCompleted,
        }
        fetch(`http://localhost:8088/serviceTickets/${ticketId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateTicket)
        })
            .then(() => {
                history.push("/serviceTickets")
            })
    }

    return (
        <>
            <section className="ticket">
                <h3 className="ticket__description">{tickets.description}</h3>
                <div className="ticket__customer">Submitted by {tickets.customer?.name}</div>
                <div className="ticket__employee">Assigned to
                    <select
                        value={ tickets.employeeId }
                        onChange={assignEmployee}
                        >
                        {
                            employees.map(e => <option key={`employee--${e.id}`} value={e.id}>{e.name}</option>)
                        }
                    </select>
                </div>
            </section>
        </>
    )
}