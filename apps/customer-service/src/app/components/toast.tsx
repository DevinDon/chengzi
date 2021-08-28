import styled from 'styled-components';

interface Props {
  text: string;
}

const StyledToast = styled.div`
  opacity: 0;
  transition: ease-in-out opacity 300ms;

  border-radius: 4px;
  box-shadow: 3px 0 8px -4px black;

  width: 10rem;
`;

export default ({ text = '复制成功，请按 Ctrl + V 进行复制' }: Props) => <StyledToast className="siimple-alert siimple-alert--success">
  {text}
</StyledToast>;
