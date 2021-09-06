import tw from 'tailwind-styled-components';

interface Props {
  className?: string;
}

const StyledDivider = tw.hr`
  border-0
  w-full h-px
  bg-gray-500
  bg-opacity-50
  mt-2 mb-2
`;

export const DividerComponent = ({ className }: Props) => <StyledDivider className={className} />;

export default DividerComponent;
