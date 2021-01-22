import gql from 'graphql-tag';

export const LOG_IN = gql`
    mutation requestSecret($email : String!) {
        requestSecret(email:$email)
    }
`;