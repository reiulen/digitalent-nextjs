import React from 'react'

const PageWrapper = ({ children }) => {
    return (
        <div className="d-flex flex-column-fluid">
            <div className="container">
                {children}
            </div>
        </div>
    )
}

export default PageWrapper