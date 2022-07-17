import { gql } from '@apollo/client';

export const GET_CURRENT_USER_QUERY = gql`
  query GetCurrentUser {
    me {
      username
      email
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation RegisterUser($data: UsersPermissionsRegisterInput!) {
    register(input: $data) {
      jwt
      user {
        username
        email
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation LoginUser($data: UsersPermissionsLoginInput!) {
    login(input: $data) {
      jwt
      user {
        username
        email
      }
    }
  }
`;
