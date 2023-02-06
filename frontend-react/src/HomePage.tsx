import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./auth/LoginButton";

function HomePage () {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (<>
    { isAuthenticated && <div>
      Hello world. Current projects: 
      <ul>
        <li><Link to="/todo">Todo app</Link></li>
      </ul>
    </div> }
    {!isAuthenticated && <div>
      Not authenticated<br/>
      <LoginButton />
    </div>}
  </> )
}

export default HomePage;