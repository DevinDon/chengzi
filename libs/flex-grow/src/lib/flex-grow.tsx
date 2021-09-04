import tw from 'tailwind-styled-components';

export interface Props {
  flexGrow?: number;
}

const StyledFlexGrow = tw.div`
  flex-grow
`;

export const FlexGrowComponent = ({ flexGrow = 1 }: Props) => <StyledFlexGrow style={{ flexGrow }} />;
