import Form from './styles/Form';
import useForm from '../lib/useForm';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import DisplayError from './ErrorMessage';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $token: String!
    $password: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
    }
  }
`;

export default function Reset({ token }) {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    email: '',
    password: '',
    token,
  });

  const [reset, { data, loading }] = useMutation(RESET_MUTATION, {
    variables: inputs,
  });

  const error = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : undefined;

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await reset().catch(console.error);
    resetForm();
  }

  if (data?.createUser) {
    return <p>Signed up with {data.createUser.email}</p>;
  }

  return (
    <Form method='POST' onSubmit={handleSubmit}>
      <h2>Reset your password</h2>
      <DisplayError error={error} />
      <fieldset>
        {data?.redeemUserPasswordResetToken === null && (
          <p>Success! You can now sign in</p>
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
        <label htmlFor='password'>
          Password
          <input
            type='password'
            name='password'
            placeholder='password'
            autoComplete='password'
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
      </fieldset>
      <button type='submit'>Request Reset</button>
    </Form>
  );
}
