import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

export default function ResetPage({ query }) {
  if (!query?.token)
    return (
      <div>
        <p>Supply token</p>
        <RequestReset />
      </div>
    );
  return (
    <div>
      Reset your password
      <Reset token={query.token} />
    </div>
  );
}
