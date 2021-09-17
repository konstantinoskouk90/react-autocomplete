import FindMovieSearch from './find-movie/find-movie-search';
import styled from 'styled-components';

const HeaderContainer = styled('section')`
  align-items: center;
  background-color: #222222;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  height: 60px;
  padding: 0 30px;
`;

const Title = styled('section')`
  color: #f5c518;
  display: flex;
  font-size: 1.2rem;
  margin-right: 8px;
`;

const Description = styled(Title)`
  justify-content: flex-end;
  margin-left: 8px;
  margin-right: 0;
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Title>React Async Autocomplete</Title>
      <FindMovieSearch />
      <Description>data by OMDb API</Description>
    </HeaderContainer>
  );
};


export default Header;