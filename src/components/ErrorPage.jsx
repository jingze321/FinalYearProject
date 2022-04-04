import React,{useState,useEffect} from 'react'

export const ErrorPage = () => {
    const [counter, setCounter] = React.useState(5);
    useEffect(() => {
        const interval = setInterval(() => {
            window.location.href = "/";
        }, 5000);
        return () => clearInterval(interval);
      }, []);
      setInterval(() => setCounter(counter - 1), 1000);
    return (
        <div className="page-wrap d-flex flex-row align-items-center" style={{"min-height": "100vh"}}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12 text-center">
                        <span className="display-1 d-block">404</span>
                        <div className="mb-4 lead">The page you are looking for was not found.</div>
                        <div>Countdown: {counter}</div>
                        <a href="/" className="btn btn-link">Back to Home</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
