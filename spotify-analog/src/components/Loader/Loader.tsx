import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Loader = styled.div`
  border-width: 0.5rem;
  border-style: solid;
  border-color: #1ed760 #1ed760 #1ed760 transparent;
  width: 3.625rem;
  height: 3.625rem;
  border-radius: 50%;
  position: relative;
  -webkit-animation: spin linear 2s infinite;
  animation: spin linear 2s infinite;

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

//Create functional component
export const LoadingSpinner = () => {
  return (
    <Container>
      <Loader />
    </Container>
  );
};
