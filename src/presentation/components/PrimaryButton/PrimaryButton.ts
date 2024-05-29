import styled from "styled-components";

export const PrimaryButton = styled.button<{ $isDisabled?: boolean }>`
display: inline-block;
outline: 0;
cursor: pointer;
border: none;
padding: 0 56px;
height: 50px;
line-height: 45px;
border-radius: 7px;
background-color: #0070f3;
color: white;
font-weight: 400;
font-size: 16px;
box-shadow: 0 4px 14px 0 rgb(0 118 255 / 39%);
transition: background 0.2s ease,color 0.2s ease,box-shadow 0.2s ease;
box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
:hover{
    background: rgba(0,118,255,0.9);
    box-shadow: 0 6px 20px rgb(0 118 255 / 23%);
}

opacity: ${props => props.$isDisabled ? 0.5 : 1};
`