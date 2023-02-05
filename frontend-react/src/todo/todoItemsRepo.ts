// FIXME remove hardcoded value
const authorization = 'Bearer 123';

export interface TodoItem {
  id: number
  name: string
}

export async function list(): Promise<TodoItem[]> {
  const res = await fetch("http://localhost:8081/todo/item", {
    headers: {
      authorization
    }
  })
  return res.json()
}

export async function findById(id: number): Promise<TodoItem> {
  const res = await fetch(`http://localhost:8081/todo/item/${id}`, {
    headers: {
      authorization
    }
  })
  return res.json()
}

export default {
  list,
  findById
}