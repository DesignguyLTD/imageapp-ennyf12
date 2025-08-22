import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchInput from '../components/searchinput/SearchInput';

describe('SearchInput', () => {
  it('renders with default placeholder', () => {
    render(<SearchInput />);
    const inputElement = screen.getByPlaceholderText('Search for your images');
    expect(inputElement).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    render(<SearchInput placeholder="Find something..." />);
    const inputElement = screen.getByPlaceholderText('Find something...');
    expect(inputElement).toBeInTheDocument();
  });

  it('calls onSearch with the input value when "Go" button is clicked', () => {
    const mockSearch = jest.fn();
    render(<SearchInput onSearch={mockSearch} />);
    const input = screen.getByPlaceholderText('Search for your images');
    const button = screen.getByText('Go');

    fireEvent.change(input, { target: { value: 'mountains' } });
    fireEvent.click(button);

    expect(mockSearch).toHaveBeenCalledWith('mountains');
  });

  it('calls onSearch when Enter key is pressed', () => {
    const mockSearch = jest.fn();
    render(<SearchInput onSearch={mockSearch} />);
    const input = screen.getByPlaceholderText('Search for your images');

    fireEvent.change(input, { target: { value: 'sunsets' } });
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    expect(mockSearch).toHaveBeenCalledWith('sunsets');
  });

  it('focuses input if isFocused is true', () => {
    render(<SearchInput isFocused />);
    const input = screen.getByPlaceholderText('Search for your images');
    expect(document.activeElement).toBe(input);
  });
});
