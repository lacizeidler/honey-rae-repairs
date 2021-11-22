import React, { useState } from "react"
import { useHistory } from "react-router";

export const EmployeeForm = () => {
    const [ticket, update] = useState({
        name: "",
        specialty: ""
    });


    const history = useHistory()

    const SubmitForm = (event) => {
        event.preventDefault()
        const newEmployee = {
            name: ticket.name,
            specialty: ticket.specialty,
        }
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newEmployee)
        }
        return fetch("http://localhost:8088/employees", fetchOption)
        .then(response => response.json())
        .then(() => {
            history.push("/employees")
        })
    }

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">Employee Form</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                    onChange={
                        (event) => {
                            const copy = {...ticket}
                            copy.name = event.target.value
                            update(copy)
                        }
                    }
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Employee Name"
                         />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="speciality">Speciality:</label>
                    <input type="text"
                     onChange={
                        (event) => {
                            const copy = {...ticket}
                            copy.speciality = event.target.value
                            update(copy)
                        }
                    }
                         />
                </div>
            </fieldset>
            <button className="btn btn-primary" onClick={SubmitForm}>
                Finish Hiring
            </button>
        </form>
    )
}