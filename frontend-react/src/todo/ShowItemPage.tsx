import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import todoItemsRepo from './todoItemsRepo';
import useToken from '~/auth/useToken';

function ShowItemPage() {
  const { getToken } = useToken();

  const params = useParams();
  const { data: item } = useQuery('todoItem', async () => {
    const authToken = await getToken();
    return await todoItemsRepo.findById(authToken, Number(params.id));
  });

  return <div>Showing Item {item?.name}</div>;
}

export default ShowItemPage;
