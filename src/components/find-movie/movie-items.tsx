import { Movie } from '../../services/api.service';
import styled from 'styled-components';

const MoviesContainer = styled('section')`
  background-color: #222222;
  border-radius: 2px;
  font-size: 0.875rem;
  max-height: 500px;
  overflow-y: auto;
`;

const MovieItem = styled('section')`
  display: flex;
  padding: 8px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    cursor: pointer;
  }
`;

const MovieImageWrapper = styled('div')`
  color: #ffffff;
  display: flex;
`;

const MovieInfoContainer = styled('div')`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 15px;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 8px;
`;

const MovieTitle = styled('span')`
  color: #ffffff;
`;

const MovieYear = styled('span')`
  color: rgba(255, 255, 255, 0.7);
  padding-top: 8px;
`;

type MovieItemsProps = {
  movies: Movie[];
};

const MovieItems: React.FC<MovieItemsProps> = ({ movies }) => {
  return (
    <MoviesContainer aria-description='Search results'>
      {
        movies.map((movie) => {
          return (
            <MovieItem key={ movie.imdbID } role='option'>
              <MovieImageWrapper>
                <img
                  src={ movie.Poster }
                  height={ 71 }
                  width={ 48 }
                  alt={ movie.Title }
                  aria-description={ `The poster for the movie ${ movie.Title }` }
                />
              </MovieImageWrapper>
              <MovieInfoContainer>
                <MovieTitle aria-description={ `The title of the movie is ${ movie.Title }` }>
                  { movie.Title }
                </MovieTitle>
                <MovieYear aria-description={ `The years the movie was released is ${ movie.Year }` }>
                  { movie.Year }
                </MovieYear>
              </MovieInfoContainer>
            </MovieItem>
          );
        })
      }
    </MoviesContainer>
  );
};

export default MovieItems;