import styled from "styled-components";
import BackgroundImage from 'presentation/assets/img/background.png'

export const PageWrapper = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background-image: url(${BackgroundImage});
`