import config from '../config';

const authorization = config.hardcodedAuthorization;

export interface TodoItem {
  id: number
  name: string
}

export async function list(): Promise<TodoItem[]> {
  const res = await fetch(`${config.backendAPI}/todo/item`, {
    headers: {
      authorization
    }
  })
  return res.json()
}

export async function findById(id: number): Promise<TodoItem> {
  const res = await fetch(`${config.backendAPI}/todo/item/${id}`, {
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