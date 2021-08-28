import { useState } from 'react';
import styled from 'styled-components';
import { Item } from '../states';
import { useItemUpdateFrequency } from '../states';

type Props = Item;

const StyledItem = styled.li`
  width: 300px;
  transition: all 0.3s ease-in-out;
  cursor: copy !important;

  &.copied {
    cursor: not-allowed !important;
    background-color: #1abc9c;
    color: #ecf0f1;

    :hover {
      background-color: #1abc9c !important;
    }
  }
`;

export default ({ id, content, frequency }: Props) => {

  const [copied, setCopied] = useState(false);
  const updateFrequency = useItemUpdateFrequency();

  const copy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
    updateFrequency(id);
  };

  return <StyledItem className={`siimple-list-item ${copied ? 'copied' : ''}`} data-clipboard-text={content} onClick={copied ? undefined : copy}>
    <span className="content">{copied ? '内容已复制' : content}</span>
    <span className="siimple-tag siimple-tag--primary siimple-tag--rounded">
      {frequency > 999 ? Math.trunc(frequency / 1000) + 'k+' : frequency}
    </span>
  </StyledItem>;
};
