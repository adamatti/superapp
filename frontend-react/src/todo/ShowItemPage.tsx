import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import todoItemsRepo from './todoItemsRepo';
import config from '../config';

function ShowItemPage () {
  const { getAccessTokenSilently } = useAuth0();

  function getToken() {
    return getAccessTokenSilently({
      authorizationParams: {
        audience: `https://${config.auth0.domain}/api/v2/`,
        scope: "read:current_user",
      },
    });
  }  
  const params = useParams();
  const { data: item } = useQuery("todoItem", async () => {
    const authToken = await getToken();
    return todoItemsRepo.findById(authToken, Number(params.id))
  })

  return (
    <div>Showing Item { item && item.name }</div>
  )
}

export default ShowItemPage;