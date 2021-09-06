import { DividerComponent } from '@chengzi-tools/divider';
import tw from 'tailwind-styled-components';

const StyledCard = tw.li`
  w-96
  box-border
  p-4
  shadow
  rounded-sm

  transition
  transform
  hover:shadow-xl
  hover:scale-105
`;

const StyledCardTitle = tw.h3`
  font-bold
  text-lg
`;

const StyledCardDescription = tw.p`
  text-yellow-500
  text-sm
`;

const StyledCardBody = tw.div`
  box-border
  p-4
  shadow
`;

const StyledCardPreview = tw.img`
  w-full
`;

const StyledCardFooter = tw.div`
  w-full
  text-xs
  text-gray-500
  text-center
`;

interface Props {
  title: string;
  desc?: string;
  footer?: string;
  link?: string;
  image: string;
  className?: string;
}

export const CardComponent = ({ title, desc = '橙子专属', footer = '版权所有 小橙子 © 2021+', link, image, className }: Props) =>
  <a href={link} target="_blank" rel="noopener noreferrer">
    <StyledCard className={className}>
      <StyledCardTitle>{title}</StyledCardTitle>
      <StyledCardDescription>{desc}</StyledCardDescription>
      <StyledCardBody>
        <StyledCardPreview src={image} alt={title} title={title} />
      </StyledCardBody>
      <DividerComponent />
      <StyledCardFooter>{footer}</StyledCardFooter>
    </StyledCard>
  </a>;

export default CardComponent;
