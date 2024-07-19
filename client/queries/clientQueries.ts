import { gql } from "@apollo/client";

const GET_CLIENTS = gql`
  query GetClients {
    clients {
      id
      name
      email,
      phone
    }
  }
`;

const GET_CLIENT = gql`
  query GetClient($id: ID!) {
    client(id: $id) {
      id
      name
      email,
      phone,
      projects {
        id
        name
        description
        status
      }
    }
  }
`;

export { GET_CLIENTS, GET_CLIENT };
