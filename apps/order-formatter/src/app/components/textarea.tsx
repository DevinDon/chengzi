import { SwitchComponent } from '@chengzi-tools/switch';
import tw from 'tailwind-styled-components';
import { TextareaEventTarget } from '../interfaces';

const StyledContainer = tw.div`
  flex
  flex-col
  items-center
  flex-grow
  space-y-2
`;

const StyledTitle = tw.h3`
  font-bold
  text-lg
`;

const StyledTextarea = tw.textarea`
  w-full
  resize-y
  px-2
  py-2
  text-gray-700
  border-2
  rounded-md
  ${props => props.disabled ? 'cursor-pointer' : 'cursor-auto'}

  transition
  focus:outline-none
  focus:border-yellow-400
  focus:shadow
`;

interface Props {
  disabled?: boolean,
  title: string;
  content: string;
  setContent: (content: string) => void;
  placeholder: string;
  switchTitle: string;
  switchValue: boolean;
  setSwitchValue: (value: boolean) => void;
  onClick: (switchValue: boolean, target: TextareaEventTarget) => void;
}

export const TextareaComponent = ({
  disabled,
  title,
  content,
  setContent,
  placeholder,
  switchTitle,
  switchValue,
  setSwitchValue,
  onClick,
}: Props) => {

  const id = Math.random().toString(36).substr(2, 9);

  return <StyledContainer>
    <StyledTitle><label htmlFor={id}>{title}</label></StyledTitle>
    <SwitchComponent title={switchTitle} value={switchValue} setValue={setSwitchValue} />
    <StyledTextarea
      disabled={disabled}
      name={id}
      id={id}
      rows={20}
      placeholder={placeholder}
      value={content}
      onChange={e => setContent(e.target.value)}
      onClick={({ target }) => onClick(switchValue, target as TextareaEventTarget)}
    />
  </StyledContainer>;
};

export default TextareaComponent;
