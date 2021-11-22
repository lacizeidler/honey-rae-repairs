import React from "react"
import { Route, Redirect } from "react-router"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./Nav/NarBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import "./Repairs.css"

export const Repairs = () => {
    return (
        <>
            <Route
                render={ () => {
                    if (localStorage.getItem("honey_customer")) {
                        return (
                            <>
                                <NavBar />
                                <ApplicationViews />
                            </>
                        );
                    } else {
                        return <Redirect to="/login" />;
                    }
                }}
            />

            <Route path="/login">
                <Login />
            </Route>
            <Route path="/register">
                <Register />
            </Route>

        </>

    )
}