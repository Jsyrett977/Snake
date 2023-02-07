import React from "react";
import ReactDOM from "react-dom/client";

const App = () => {
    return (
        <div>
            <p>Hello world</p>
        </div>
    )
}
const root = ReactDOM.createRoot(document.getElementById('app'))
root.render(<App />)
