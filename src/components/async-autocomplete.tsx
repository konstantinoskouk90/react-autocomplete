import { useCallback, useMemo, useState, ChangeEvent } from 'react';
import debounce from 'lodash.debounce';
import Search from './inputs/search';
import CachedSearch from '../services/cached-search.service';
import { useVisible } from './hooks/use-visible';
import styled from 'styled-components';

const AutocompleteContainer = styled('section')`
  height: 32px;
  position: relative;
  width: 100%;
`;

const SearchResults = styled('section')`
  top: 36px;
  position: absolute;
  width: 100%;
`;

type AsyncAutocompleteProps<T> = {
  noResults: JSX.Element;
  placeholder: string;
  renderOptions: (options: T) => JSX.Element;
  request: (searchTerm: string) => Promise<T>;

  disableCache?: boolean;
  disableDebounce?: boolean;
  minChars?: number;
};

const DEFAULT_MIN_CHARS = 3;

export function AsyncAutocomplete<T>(props: AsyncAutocompleteProps<T[]>): JSX.Element {
  const { disableCache, disableDebounce, minChars, noResults, placeholder, renderOptions, request } = props;
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<JSX.Element>(<></>);
  const cachedSearch = useMemo(() => new CachedSearch<T>(request), []);
  const debouncedApiCall = useCallback(debounce((e) => handleApiCall(e), 500), []);
  const { ref, isVisible, setIsVisible } = useVisible(false);

  const handleApiCall = async (event: ChangeEvent<HTMLInputElement> | undefined) => {
    const trimmedValue = event?.target.value.trim();

    if (trimmedValue && trimmedValue.length >= (!minChars ? DEFAULT_MIN_CHARS : minChars)) {
      const response = !disableCache
        ? await cachedSearch.changeSearch(trimmedValue)
        : await request(trimmedValue);
 
      if (response.length > 0) {
        setResults(renderOptions(response));

        return;
      }

      // If we do not get results back after making an API call
      // display a no results message to the user
      setResults(noResults);
    }
  };

  const onChange = (event: ChangeEvent<HTMLInputElement> | undefined) => {    
    const value = event?.target.value || '';

    setIsVisible(true);
    setSearchTerm(value);

    // When the input is empty display nothing
    if (!value) {
      setResults(<></>);

      return;
    }

    !disableDebounce ? debouncedApiCall(event) : handleApiCall(event);
  }

  return (
    <AutocompleteContainer ref={ ref } aria-live='assertive'>
      <Search
        placeholder={ placeholder }
        value={ searchTerm }
        onChange={ onChange }
      />
      { isVisible && <SearchResults>
        { results }
      </SearchResults> }
    </AutocompleteContainer>
  );
};

export default AsyncAutocomplete;