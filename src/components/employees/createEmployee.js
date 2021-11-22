import { useParams } from "react-router"
import { useEffect, useState } from "react/cjs/react.development"

export const CreateEmployee = () => {
    const { employeeId } = useParams()
    const [tickets, modifyTickets] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/employees/${employeeId}`)
                .then(res => res.json())
                .then(modifyTickets)
        },
        [ employeeId ]  // Above function runs when the value of ticketId change
    )

    return (
        <>
        <h2>Employee {employeeId} Details</h2>
        <section className="ticket">
            <h3 className="ticket-name">{tickets.name}</h3>
            <div className="ticket-specialty">Specialty is {tickets.specialty}</div>
        </section>
        </>
    )
}