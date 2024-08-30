import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import LayoutRouting from './LayoutRouting';

const AppRoute = () => {
    return (
        <div>

            <Routes>

                <Route >
                    <Route path='/' exact element={<Navigate to={'/mktakent'} />}  />

                    <Route path='/mktakent/*' element={<LayoutRouting />} />

                    
                </Route>

                <Route path='/signup' element={<div>Signup</div>} />


                <Route path="*" element={<h1>Page is not found</h1>} />

            </Routes>
        </div>
    )
}


export default AppRoute