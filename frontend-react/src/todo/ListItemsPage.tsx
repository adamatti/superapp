import { useQuery } from 'react-query';
import { Message } from 'primereact/message';
import todoRepo from './todoItemsRepo';
import { Link } from 'react-router-dom';
import useToken from '~/auth/useToken';

function ListItemsPage() {
  const { getToken } = useToken();

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
