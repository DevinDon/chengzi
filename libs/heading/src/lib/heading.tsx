import styled from 'styled-components';

export interface Props {
  title: string;
  subtitle?: string;
}

const StyledHeading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const HeadingComponent = ({ title, subtitle = '小橙子专属' }: Props) => <StyledHeading>
  <h1 className="siimple-h1">{title}</h1>
  <h2 className="siimple-h2 siimple--color-warning">{subtitle}</h2>
</StyledHeading>;
