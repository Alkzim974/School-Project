import { GraphQLClient } from "graphql-request";

const API_URL = "https://zone01normandie.org/api/graphql-engine/v1/graphql";

// Cette fonction retourne un client GraphQL avec le token
export function getGraphQLClient() {
  const token = localStorage.getItem("jwt");
  return new GraphQLClient(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
