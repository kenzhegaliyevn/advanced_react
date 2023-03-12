import Form from './styles/Form';
import useForm from '../lib/useForm';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from './User';
import DisplayError from './ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

export default function RequestReset() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    email: '',
  });

  const [signup, { data, loading, error }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: inputs,
      // refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await signup().catch(console.error);
    resetForm();
  }

  if (data?.createUser) {
    return <p>Signed up with {data.createUser.email}</p>;
  }

  return (
    <Form method='POST' onSubmit={handleSubmit}>
      <h2>Request a Password Reset</h2>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        {data?.sendUserPasswordResetLink === null && (
          <p>Success! Check your email for a link!</p>
        )}
        <label htmlFor='email'>
          Email
          <input
            type='email'
            name='email'
            placeholder='email'
            autoComplete='email'
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
      </fieldset>
      <button type='submit'>Request Reset</button>
    </Form>
  );
}

export { REQUEST_RESET_MUTATION };
