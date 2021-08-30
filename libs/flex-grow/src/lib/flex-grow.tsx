import styled from 'styled-components';

export interface Props {
  flexGrow?: number;
}

const StyledFlexGrow = styled.div`
  flex-grow: 1;
`;

export const FlexGrowComponent = ({ flexGrow = 1 }: Props) => <StyledFlexGrow style={{ flexGrow }} />;
