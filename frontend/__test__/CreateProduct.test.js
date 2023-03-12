import { MockedProvider } from '@apollo/react-testing';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Router from 'next/router';
import CreateProduct, {
  CREATE_PRODUCT_MUTATION,
} from '../components/CreateProduct';
import { fakeItem, makePaginationMocksFor } from '../lib/testUtils';
import { ALL_PRODUCTS_QUERY } from '../components/Produtcs';
import wait from 'waait';

const item = fakeItem();

jest.mock('next/router', () => ({
  push: jest.fn(),
}));

describe('<CreateProduct/>', () => {
  it('renders and matches snapshot', () => {
    const { container } = render(
      <MockedProvider>
        <CreateProduct />
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it('handles the updating', async () => {
    const { container, debug } = render(
      <MockedProvider>
        <CreateProduct />
      </MockedProvider>
    );
    await userEvent.type(screen.getByPlaceholderText(/name/i), item.name);
    await userEvent.type(
      screen.getByPlaceholderText(/price/i),
      `${item.price}`
    );
    await userEvent.type(
      screen.getByPlaceholderText(/description/i),
      item.description
    );
    expect(screen.getByDisplayValue(item.name)).toBeInTheDocument();
    // expect(screen.getByDisplayValue(item.price)).toBeInTheDocument();
    expect(screen.getByDisplayValue(item.description)).toBeInTheDocument();
  });

  it('creates the items when the form is submitted', async () => {
    const mocks = [
      {
        request: {
          query: CREATE_PRODUCT_MUTATION,
          variables: {
            name: item.name,
            description: item.description,
            image: '',
            price: item.price,
          },
        },
        result: {
          data: {
            createProduct: {
              ...item,
              id: 'abc123',
              __typename: 'Item',
            },
          },
        },
      },
      {
        request: {
          query: ALL_PRODUCTS_QUERY,
          variables: {
            skip: 0,
            first: 2,
          },
        },
        result: {
          data: {
            allProducts: [item],
          },
        },
      },
    ];

    const { container, debug } = render(
      <MockedProvider mocks={mocks}>
        <CreateProduct />
      </MockedProvider>
    );
    await userEvent.type(screen.getByPlaceholderText(/name/i), item.name);
    await userEvent.type(
      screen.getByPlaceholderText(/price/i),
      `${item.price}`
    );
    await userEvent.type(
      screen.getByPlaceholderText(/description/i),
      item.description
    );

    await userEvent.click(screen.getByText(/Add Product/i));
    await waitFor(() => wait(0));
    expect(Router.push).toHaveBeenCalled();
    expect(Router.push).toHaveBeenCalledWith({ pathname: '/product/abc123' });
  });
});
