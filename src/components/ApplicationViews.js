import React from "react"
import { Route } from "react-router-dom"
import { CreateEmployee } from "./employees/createEmployee"
import { CustomerList } from "./customers/CustomerList"
import { EmployeeForm } from "./employees/EmployeeForm"
import { EmployeeList } from "./employees/EmployeeList"
import { CreateTicket } from "./serviceTickets/createTicket"
import { ServiceTickets } from "./serviceTickets/ServiceTickets"
import { TicketForm } from "./serviceTickets/TicketForm"

export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/customers">
                <CustomerList />
            </Route>
            <Route exact path="/employees">
                <EmployeeList />
            </Route>
            <Route exact path="/serviceTickets">
                <ServiceTickets/>
            </Route>
            <Route exact path="/serviceTickets/:ticketId(\d+)">
                <CreateTicket/>
            </Route>
            <Route exact path="/employees/:employeeId(\d+)">
                <CreateEmployee/>
            </Route>
            <Route path="/serviceTickets/create">
                <TicketForm />
            </Route>
            <Route path="/employees/create">
                <EmployeeForm />
            </Route>
        </>
    )
}