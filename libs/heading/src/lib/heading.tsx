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
  <div className="siimple-navbar siimple-navbar--fluid">
    <span className="siimple-navbar-title">{title}</span>
    <span className="siimple-navbar-subtitle siimple--color-warning">{subtitle}</span>
    <div className="siimple--float-right">
      <a
        className="siimple-navbar-item siimple-link"
        href="https://github.com/devindon/chengzi-tools"
        target="_blank"
        rel="noopener noreferrer"
      >GitHub</a>
    </div>
  </div>
</StyledHeading>;
