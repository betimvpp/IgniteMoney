import { styled } from "styled-components";

export const SearchFormContainer = styled.form`
  display: flex;
  gap: 1rem;

  input{
    flex: 1;
    border-radius: 6px;
    background-color: ${props => props.theme["gray-900"]};
    color: ${props => props.theme["gray-300"]};
    padding: 1rem;
    border: 0;
  
    &::placeholder{
      color: ${props => props.theme["gray-500"]};
    }
  }

  button{
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    cursor: pointer;

    border: 1px solid ${props => props.theme["green-500"]};
    background: transparent;
    color: ${props => props.theme["green-300"]};
    font-weight: bold;
    border-radius: 6px;

    &:disabled{
      opacity: 0.7;
      cursor: not-allowed;
    }

    &:not(:disabled):hover{
      border-color: ${props => props.theme["green-500"]};
      background: ${props => props.theme["green-500"]};
      color: ${props => props.theme.white};
      transition: background-color 0.2s, colo 0.2s, border-color 0.2s;
    }
  }
`;