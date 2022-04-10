import React from 'react'

function Loading() {
  return (
    // <div className="text-center">
    //     <div className="spinner-border" role="status">
    //         <span className="sr-only">Loading...</span>
    //     </div>
    // </div>
    <div className="container-fluid vh-100">
        <div className="h-100 row align-items-center">
            <div className="text-center ">
                <div className="spinner-grow" role="status">
                </div>
                {/* <p className="sr-only">Loading...</p> */}

            </div>
        </div>
    </div>
  )
}

export default Loading