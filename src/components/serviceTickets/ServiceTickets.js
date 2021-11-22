import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { Link } from "react-router-dom"
import "./Tickets.css"

export const ServiceTickets = () => {
    const [serviceTickets, modifyServiceTickets] = useState([])
    const [active, setActive] = useState("")
    const history = useHistory()

    useEffect(
        () => {
            fetch("http://localhost:8088/serviceTickets?_expand=employee&_expand=customer")
                .then(res => res.json())
                .then((serviceTicketsArray) => {
                    modifyServiceTickets(serviceTicketsArray)
                })
        },
        []
    )

    useEffect(
        () => {
            const activeTicketCount = serviceTickets.filter(t => t.dateCompleted === "").length
            setActive(`There are ${activeTicketCount} open tickets.`)
        },
        [serviceTickets]
    )
    
    const deleteTicket = (id) => {
        fetch(`http://localhost:8088/serviceTickets/${id}`, {
            method: "DELETE"
        })
        .then (() => {
            fetch("http://localhost:8088/serviceTickets?_expand=employee&_expand=customer")
            .then(res => res.json())
            .then((serviceTicketsArray) => {
                modifyServiceTickets(serviceTicketsArray)
            })}
        )
    }

    return (
        <>
            <div>
                <button onClick={() => history.push("/serviceTickets/create")}>Create Ticket</button>
            </div>
            {active}
            {
                serviceTickets.map(
                    (serviceTicketsObject) => {
                        return <div className={`ticket ${serviceTicketsObject.emergency ? 'emergency' : 'notEmergency'}`} key={`serviceTickets--${serviceTicketsObject.id}`}>
                            {serviceTicketsObject.emergency ? "🚑   " : ""}
                            <Link to={`/serviceTickets/${serviceTicketsObject.id}`}>{serviceTicketsObject.description}</Link> submitted by {serviceTicketsObject.customer.name} and worked on by {serviceTicketsObject.employee.name}
                            <button onClick={() => {
                                deleteTicket(serviceTicketsObject.id)
                            }}>Delete</button>
                        </div>

                    }
                )
            }
        </>
    )
}

