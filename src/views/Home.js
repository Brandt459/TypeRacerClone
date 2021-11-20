import TypeRacer from '../components/TypeRacer'
import { Link } from 'react-router-dom'


export default function App() {
    const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, {name: 'Page B', uv: 400, pv: 2400, amt: 2400}]

    return (
        <>
            <TypeRacer />
            {/* <Link to="/login">Login</Link><br/>
            <Link to="/register">Register</Link> */}
        </>
    )
}