import { useState } from 'react';
import styled from 'styled-components';
import { Item } from '../data';

type Props = Item;

const StyledItem = styled.li`
width: 300px;

:active {
  filter: brightness(0.9);
}
`;

const StyledCopiedItem = styled.li`
  cursor: disabled;
  background-color: #1abc9c;
  color: #ecf0f1;

  :hover {
    background-color: #1abc9c !important;
  }
`;

export default ({ frequency, content }: Props) => {

  const [copied, setCopied] = useState(false);

  const copy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 25000);
  };

  return copied
    ? <StyledCopiedItem className="siimple-list-item">内容已复制</StyledCopiedItem>
    : <StyledItem className="siimple-list-item" data-clipboard-text={content} onClick={copy}>
      <span className="content">{content}</span>
      <span className="siimple-tag siimple-tag--primary siimple-tag--rounded">
        {frequency > 999 ? Math.trunc(frequency / 1000) + 'k+' : frequency}
      </span>
    </StyledItem>;
};
