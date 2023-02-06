import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "react-query";
import todoRepo from './todoItemsRepo';
import { Link } from "react-router-dom";
import config from '../config';

function ListItemsPage() {
  const { getAccessTokenSilently } = useAuth0();

  function getToken() {
    return getAccessTokenSilently({
      authorizationParams: {
        audience: `https://${config.auth0.domain}/api/v2/`,
        scope: "read:current_user",
      },
    });
  }

  const { data } = useQuery("todoItems", async () => {
    const authToken = await getToken();
    return todoRepo.list(authToken);
  })

  return (
    <>
      List
      <ul>
      { data && data.map(item => 
        <li key={item.id}>
          <Link to={`/todo/items/${item.id}`}> {item.name} </Link>
        </li>) }
      </ul>
    </>
  )
}

export default ListItemsPage;