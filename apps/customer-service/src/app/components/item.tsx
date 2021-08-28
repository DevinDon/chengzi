import { useState } from 'react';
import styled from 'styled-components';
import { Item } from '../states';
import { useItemUpdateFrequency } from '../states';

type Props = Item;

const StyledItem = styled.li`
  width: 300px;
  transition: all 0.3s ease-in-out;
`;

const StyledActions = styled.div`
  display: flex;
  flex-direction: row;

  > span {
    flex-grow: 1;
    height: 100%;
    text-align: center;
    &:first-child {
      border-left: 1px dashed gray;
      border-right: 1px dashed gray;
      color: #e74c3c;
    }
    &:last-child {
      border-left: 1px dashed gray;
      border-right: 1px dashed gray;
      flex-grow: 4;
      cursor: copy;
    }
    &.copied {
      cursor: not-allowed !important;
      color: #2ecc71;
    }
  }
`;

export default ({ id, content, frequency }: Props) => {

  const [isOver, setIsOver] = useState(false);
  const [copied, setCopied] = useState(false);
  const updateFrequency = useItemUpdateFrequency();

  const copy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
    updateFrequency(id);
  };

  return <StyledItem
    className="siimple-list-item"
    data-clipboard-text={content}
    onMouseEnter={() => setIsOver(true)}
    onMouseLeave={() => setIsOver(false)}
  >
    {
      isOver
        ? <StyledActions>
          <span>删除</span>
          <span>编辑</span>
          <span className={`copy-text ${copied ? 'copied' : ''}`} onClick={copied ? undefined : copy} data-clipboard-text={content}>{copied ? '复制成功' : '点击复制'}</span>
        </StyledActions>
        : <>
          <span className="content">{content}</span>
          <span className="siimple-tag siimple-tag--primary siimple-tag--rounded">
            {frequency > 999 ? Math.trunc(frequency / 1000) + 'k+' : frequency}
          </span>
        </>
    }
  </StyledItem>;
};
