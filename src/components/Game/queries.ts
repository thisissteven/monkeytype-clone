import { gql } from '@apollo/client';

export const CreateLeaderboard = gql`
  mutation CreateLeaderboard($data: LeaderboardInput!) {
    createLeaderboard(data: $data) {
      data {
        id
        attributes {
          wpm
        }
      }
    }
  }
`;
