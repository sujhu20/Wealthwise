import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TransactionList from '../components/TransactionList';

const mockTransactions = [
  {
    id: '1',
    description: 'Salary',
    amount: 5000,
    date: '2024-01-01',
    category: 'Income',
    type: 'income'
  },
  {
    id: '2',
    description: 'Rent',
    amount: 1500,
    date: '2024-01-02',
    category: 'Housing',
    type: 'expense'
  }
];

describe('TransactionList Component', () => {
  const mockDeleteTransaction = jest.fn();
  const mockUpdateTransaction = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders transaction list correctly', () => {
    render(
      <TransactionList
        transactions={mockTransactions}
        isLoading={false}
        deleteTransaction={mockDeleteTransaction}
        updateTransaction={mockUpdateTransaction}
      />
    );

    expect(screen.getByText('Salary')).toBeInTheDocument();
    expect(screen.getByText('Rent')).toBeInTheDocument();
  });

  test('filters transactions by search', () => {
    render(
      <TransactionList
        transactions={mockTransactions}
        isLoading={false}
        deleteTransaction={mockDeleteTransaction}
        updateTransaction={mockUpdateTransaction}
      />
    );

    const searchInput = screen.getByPlaceholderText('Search transactions...');
    fireEvent.change(searchInput, { target: { value: 'Salary' } });

    expect(screen.getByText('Salary')).toBeInTheDocument();
    expect(screen.queryByText('Rent')).not.toBeInTheDocument();
  });

  test('sorts transactions by amount', async () => {
    render(
      <TransactionList
        transactions={mockTransactions}
        isLoading={false}
        deleteTransaction={mockDeleteTransaction}
        updateTransaction={mockUpdateTransaction}
      />
    );

    const amountHeader = screen.getByText('Amount');
    fireEvent.click(amountHeader);

    await waitFor(() => {
      const amounts = screen.getAllByText(/\$\d+\.\d{2}/);
      expect(amounts[0].textContent).toContain('5000.00');
    });
  });

  test('deletes transaction after confirmation', () => {
    window.confirm = jest.fn(() => true);

    render(
      <TransactionList
        transactions={mockTransactions}
        isLoading={false}
        deleteTransaction={mockDeleteTransaction}
        updateTransaction={mockUpdateTransaction}
      />
    );

    const deleteButtons = screen.getAllByRole('button', { name: '' });
    fireEvent.click(deleteButtons[1]);

    expect(mockDeleteTransaction).toHaveBeenCalledWith('2');
  });

  test('shows loading state', () => {
    render(
      <TransactionList
        transactions={[]}
        isLoading={true}
        deleteTransaction={mockDeleteTransaction}
        updateTransaction={mockUpdateTransaction}
      />
    );

    expect(screen.getByText('Loading transactions...')).toBeInTheDocument();
  });
}); 