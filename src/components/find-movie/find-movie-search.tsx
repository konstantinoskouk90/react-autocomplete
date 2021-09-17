import AsyncAutocomplete from '../async-autocomplete';
import MovieItems from './movie-items';
import NoResults from './no-results';
import { api, Movie } from '../../services/api.service';

const FindMovieSearch: React.FC = () => {
  return (
    <AsyncAutocomplete
      noResults={ <NoResults /> }
      placeholder='Search for a movie by title'
      request={ api.omdbSearch.bind(api) }
      renderOptions={ (items: Movie[]) => <MovieItems movies={ items } /> }
    />
  );
};

export default FindMovieSearch;