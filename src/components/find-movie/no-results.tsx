import styled from 'styled-components';

const NoResultsContainer = styled('section')`
  background-color: #222222;
  border-radius: 2px;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  padding: 50px;
`;

const NoResultsText = styled('section')`
  color: #ff0000;
  font-size: 1.2rem;
`;

const NoResults: React.FC = () => {
  return (
    <NoResultsContainer>
      <NoResultsText>No results found.</NoResultsText>
    </NoResultsContainer>
  );
};

export default NoResults;