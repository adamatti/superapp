import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from 'react-query';
import { Message } from 'primereact/message';
import todoRepo from './todoItemsRepo';
import { Link } from 'react-router-dom';
import config from '../config';

function ListItemsPage() {
  const { getAccessTokenSilently } = useAuth0();

  async function getToken() {
    return await getAccessTokenSilently({
      authorizationParams: {
        audience: `https://${config.auth0.domain}/api/v2/`,
        scope: 'read:current_user',
      },
    });
  }

  const { isError, error, data } = useQuery('todoItems', async () => {
    const authToken = await getToken();
    return await todoRepo.list(authToken);
  });

  if (isError) {
    console.error(error);
  }

  return (
    <>
      List
      <ul>
        {isError && <Message severity="error" text="There was an error loading data" />}
        {!isError &&
          data?.map((item) => (
            <li key={item.id}>
              <Link to={`/todo/items/${item.id}`}> {item.name} </Link>
            </li>
          ))}
      </ul>
    </>
  );
}

export default ListItemsPage;
