import { FlexGrowComponent } from '@chengzi-tools/flex-grow';
import tw from 'tailwind-styled-components';
import githubIcon from '../assets/github.icon.svg';

export interface Props {
  title: string;
  subtitle?: string;
}

const StyledHeading = tw.div`
  flex
  flex-row
  justify-between
  items-end
  space-x-4

  w-full
  shadow
  p-4
`;

const StyledTitle = tw.h1`
  font-bold
  text-2xl
`;

const StyledSubtitle = tw.h2`
  text-base
  text-yellow-500
`;

const StyledLink = tw.a`
  w-8
  h-8
  rounded-full
  transition
  transform
  hover:scale-110
  hover:shadow
`;

export const HeadingComponent = ({ title, subtitle = '小橙子专属' }: Props) => <StyledHeading>
  <StyledTitle>{title}</StyledTitle>
  <StyledSubtitle>{subtitle}</StyledSubtitle>
  <FlexGrowComponent />
  <StyledLink
    href="https://github.com/devindon/chengzi-tools"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img src={githubIcon} alt="GitHub Icon" />
  </StyledLink>
</StyledHeading>;
