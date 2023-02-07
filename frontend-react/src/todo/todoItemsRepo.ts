import config from '../config';

export interface TodoItem {
  id: number;
  name: string;
}

export async function list(accessToken: string): Promise<TodoItem[]> {
  const res = await fetch(`${config.backendAPI}/api/todo/item`, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });
  return await res.json();
}

export async function findById(accessToken: string, id: number): Promise<TodoItem> {
  const res = await fetch(`${config.backendAPI}/api/todo/item/${id}`, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });
  return await res.json();
}

export default {
  list,
  findById,
};
