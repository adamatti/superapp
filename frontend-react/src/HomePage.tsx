import { Link } from "react-router-dom";

function HomePage () {
  return (
    <div>
      Hello world. Current projects: 
      <ul>
        <li><Link to="/todo">Todo app</Link></li>
      </ul>
    </div>
  )
}

export default HomePage;