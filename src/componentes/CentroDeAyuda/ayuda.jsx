import { useState } from "react"
import { Link } from "react-router-dom"

function Ayuda (){

    const [algo, setAlgo] = useState(0)
    return (
        <div style={{
            borderTop: "1px solid black"
        }}>
        <div>
            <Link to= "/ayuda">
            <button
            style={{backgroundColor: "transparent", color: "black",fontSize:"20px"}}>Ayuda</button>
            </Link>
        </div>
        </div>
    )
}

export default Ayuda