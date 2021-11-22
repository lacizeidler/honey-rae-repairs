import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const CustomerList = () => {
    const [customers, modifyCustomers] = useState([])
    const [totalCustomerMessage, updateMessage] = useState("")
    useEffect(
        () => {
            fetch("http://localhost:8088/customers")
                .then(res => res.json())
                .then((customersArray) => {
                    modifyCustomers(customersArray)
                })
        },
        []
    )

        useEffect(
            () => {
                if (customers.length === 1) {
                    updateMessage("You have 1 customer")
                } else {
                    updateMessage(`You have ${customers.length} customers`)
                }
            },
            [customers]
        )

    return (
        <>
            <div>{totalCustomerMessage}</div>
            {
                customers.map(
                    (customerObject) => {
                        return <p key={`customer--${customerObject.id}`}>{customerObject.name}</p>
                    }
                )
            }
        </>
    )
}