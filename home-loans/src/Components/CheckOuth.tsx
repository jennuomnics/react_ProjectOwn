import React from 'react'
import { Navigate } from 'react-router-dom'


interface checkOutProps {
    children:React.ReactNode
}

const CheckOuth = ({children}:checkOutProps) => {
    
     const isLoggin = localStorage.getItem('accessToken')
     if(!isLoggin) {
       return <Navigate to='/Login' replace />
     }

    return children
}

export default CheckOuth