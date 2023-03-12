import Form from './styles/Form';
import useForm from '../lib/useForm';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from './User';
import DisplayError from './ErrorMessage';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $password: String!
    $name: String!
  ) {
    createUser(data: { email: $email, password: $password, name: $name }) {
      id
      email
      name
    }
  }
`;

export default function SignUp() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    email: '',
    name: '',
    password: '',
  });

  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
    variables: inputs,
    // refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

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
      <h2>Sign Up for an account</h2>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor='name'>
          Name
          <input
            type='text'
            name='name'
            placeholder='name'
            autoComplete='name'
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
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
      <button type='submit'>Sign Up</button>
    </Form>
  );
}

export { SIGNUP_MUTATION };
