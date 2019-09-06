import './styles/main.scss';
import { gql } from 'apollo-boost';
import { $, getFormValues } from './js/DOMUtils';
import apolloClient from './js/apollo';

document.addEventListener('DOMContentLoaded', () => {
    const form = $('#signup-form');
    form.addEventListener('submit', e => {
        e.preventDefault();
        const values = getFormValues(e.currentTarget);
        apolloClient
            .mutate({
                mutation: gql`
                    mutation createUser($values: UserInput) {
                        createUser(data: $values) {
                            id
                            username
                        }
                    }
                `,
                variables: { values }
            })
            .then(resp => {
                console.log(resp);
            })
            .catch(err => {
                console.log(err);
            });
    });
});
