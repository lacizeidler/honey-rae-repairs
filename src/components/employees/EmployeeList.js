import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { Link } from "react-router-dom"

export const EmployeeList = () => {
    const [employees, changeEmployee] = useState([])
    const [specialties, modifySpecialties] = useState("")
    const history = useHistory()

    useEffect(
        () => {
            fetch("http://localhost:8088/employees")
                .then(res => res.json())
                .then((data) => {
                    changeEmployee(data)
                })
        },
        []
    )

    useEffect(() => {
        /*
            1. Use .map() to get the specialty of each employee
            2. Then update a state variable to be a comma-separated string
                (e.g. "iPhone, Printers, ...")
        */
       const justSpecialties = employees.map(employeeObject => employeeObject.specialty)
       modifySpecialties(justSpecialties.join(", "))
    }, [employees])

    return (
        <>
            <div>
            <button onClick={() => history.push("/employees/create")}>New Employee</button>
            </div>
            <div>
                Specialties: {  specialties }
            </div>
            {
                employees.map(
                    (employee) => {
                        return <p key={`employee--${employee.id}`}><Link to={`employees/${employee.id}`}>{employee.name}</Link></p>
                    }
                )
            }
        </>
    )
}