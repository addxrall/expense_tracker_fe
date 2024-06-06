import { gql, useQuery } from "@apollo/client";
import { IsUserLoggedInQuery } from "../interfaces";

export const IS_COOKIE_PRESENT = gql`
  query Query {
    isUserLoggedIn {
      email
    }
  }
`;

export const useIsCookiePresent = () =>
  useQuery<IsUserLoggedInQuery>(IS_COOKIE_PRESENT);
