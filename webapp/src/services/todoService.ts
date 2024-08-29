import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // replace with your GraphQL API URL
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
    query: {
      fetchPolicy: 'no-cache',
    },
    mutate: {
      fetchPolicy: 'no-cache',
    },
  },
});

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  updatedAt: Date;
  createdAt: Date;
}

class TodoService {
  async getTodos(): Promise<Task[]> {
    const { data } = await client.query({
      query: gql`
        query {
          tasks {
            id
            title
            description,
            completed,
          }
        }
      `,
    });
    return data.tasks;
  }

  async createTask(task: Task): Promise<Task> {
    const { data } = await client.mutate({
      mutation: gql`
        mutation CreateTask($title: String!, $description: String!) {
          createTask(title: $title, description: $description) {
            id
            title
            description
          }
        }
      `,
      variables: task,
    });
    return data.createTask;
  }

  async updateTask(task: Task): Promise<Task> {
    const { data } = await client.mutate({
      mutation: gql`
        mutation UpdateTask($id: ID!, $title: String, $description: String, $completed: Boolean) {
          updateTask(id: $id, title: $title, description: $description, completed: $completed) {
            id
            title
            description
          }
        }
      `,
      variables: { ...task },
    });
    return data.updateTask;
  }

  async deleteTask(id: number): Promise<boolean> {
    const { data } = await client.mutate({
      mutation: gql`
        mutation DeleteTask($id: ID!) {
          deleteTask(id: $id)
        }
      `,
      variables: { id },
    });
    return data.deleteTask;
  }
}

export default new TodoService();