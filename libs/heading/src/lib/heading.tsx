import { FlexGrowComponent } from '@chengzi-tools/flex-grow';
import tw from 'tailwind-styled-components';
import boxIcon from '../assets/box.icon.svg';
import githubIcon from '../assets/github.icon.svg';

export interface Props {
  title: string;
  subtitle?: string;
}

const StyledIconLink = tw.a`
  w-7 h-7
  self-center
  rounded-full
  flex-shrink-0
  transition transform
  hover:scale-110 hover:shadow
`;

const StyledHeading = tw.div`
  flex flex-row justify-between items-end space-x-4
  w-full p-4
  shadow
`;

const StyledTitle = tw.h1`
  font-bold text-2xl
  flex-shrink-0
  truncate
`;

const StyledSubtitle = tw.h2`
  text-base text-yellow-500
  flex-shrink
  truncate
`;

export const HeadingComponent = ({ title, subtitle = '小橙子专属' }: Props) => <StyledHeading>
  <StyledIconLink
    href="/"
    title="返回主页"
    rel="noopener noreferrer"
  >
    <img src={boxIcon} alt="Tool Icon" />
  </StyledIconLink>
  <StyledTitle>{title}</StyledTitle>
  <StyledSubtitle>{subtitle}</StyledSubtitle>
  <FlexGrowComponent />
  <StyledIconLink
    href="https://github.com/devindon/chengzi-tools"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img src={githubIcon} alt="GitHub Icon" />
  </StyledIconLink>
</StyledHeading>;
