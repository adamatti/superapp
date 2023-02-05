import { useQuery } from "react-query";
import { Form, useLoaderData, useParams } from "react-router-dom";
import todoItemsRepo from './todoItemsRepo';

function ShowItemPage () {
  const params = useParams();
  const { data: item } = useQuery("todoItem", () => todoItemsRepo.findById(Number(params.id)))

  return (
    <div>Showing Item { item && item.name }</div>
  )
}

export default ShowItemPage;