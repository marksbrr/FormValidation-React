import {
  fireEvent, getByDisplayValue, render, screen,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App';
import Form from './components/form/form';

describe(' <App /> ', () => {
  it('should render with initial content', () => {
    render(<App />);
    expect(screen.queryByText('Buy Teddy Beer')).toBeInTheDocument();
    expect(screen.queryByText('E-mail')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('E-mail')).toBeInTheDocument();
    expect(screen.queryByText('Card information')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('0000 0000 0000 0000')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('MM/YY')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('CVC')).toBeInTheDocument();
    expect(screen.queryByText('Name on card')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.queryByDisplayValue('Country')).toBeInTheDocument();
    expect(screen.queryByText('Pay €55.00')).toBeInTheDocument();
  });
  describe('with valid input', async () => {
    it('calls the onSubmit function', async () => {
      const handleOnSubmit = jest.fn();
      const { getByPlaceholderText, getByRole } = render(<Form onSubmit={handleOnSubmit()} />);
      await act(async () => {
        fireEvent.change(getByPlaceholderText('E-mail'), { target: { value: 'email@test.com' } });
        fireEvent.change(getByPlaceholderText('0000 0000 0000 0000'), { target: { value: '1234567800000000' } });
        fireEvent.change(getByPlaceholderText('MM/YY'), { target: { value: '11/11' } });
        fireEvent.change(getByPlaceholderText('CVC'), { target: { value: '123' } });
        fireEvent.change(getByPlaceholderText('Name'), { target: { value: 'Test' } });
      });
      await act(async () => {
        fireEvent.click(getByRole('button'));
      });
      expect(handleOnSubmit).toBeCalled();
    });
  });
  describe('with invalid input', async () => {
  });
});
