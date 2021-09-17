import { ChangeEvent } from 'react';
import styled from 'styled-components';

const Input = styled('input')`
  all: unset;
  background-color: #ffffff;
  border-radius: 4px;
  font-size: 0.875rem;
  height: 32px;
  min-width: 200px;
  padding-left: 8px;
  padding-right: 8px;
  width: calc(100% - 16px);
`;

type SearchProps = {
  placeholder: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement> | undefined) => void;
};

const Search: React.FC<SearchProps> = ({ placeholder, value, onChange }) => {
  return (
    <Input
      type='text'
      placeholder={ placeholder }
      onChange={ onChange }
      value={ value }
      aria-labelledby='search input'
    />
  );
};

export default Search;