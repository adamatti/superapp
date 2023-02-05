import { useQuery } from "react-query";
import todoRepo from './todoItemsRepo';
import { Link } from "react-router-dom";

function ListItemsPage() {
  const { data } = useQuery("todoItems", todoRepo.list)

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