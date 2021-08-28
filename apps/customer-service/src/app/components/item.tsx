import { useState } from 'react';
import styled from 'styled-components';
import { Item, useItemRemove, useItemUpdate } from '../states';
import { useItemUpdateFrequency } from '../states';
import EditorComponent from './editor';
import ConfirmComponent from './confirm';

type Props = Item;

const StyledItem = styled.li`
  width: 300px;
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

export default ({ id, content, category, frequency }: Props) => {

  const [isOver, setIsOver] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const updateFrequency = useItemUpdateFrequency();
  const removeItem = useItemRemove();
  const updateItem = useItemUpdate();

  const copy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
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
          <span onClick={() => setIsDeleting(true)}>删除</span>
          <span onClick={() => setIsEditing(true)}>编辑</span>
          <span className={`copy-text ${isCopied ? 'copied' : ''}`} onClick={isCopied ? undefined : copy} data-clipboard-text={content}>{isCopied ? '复制成功' : '点击复制'}</span>
        </StyledActions>
        : <>
          <span className="content">{content}</span>
          <span className="siimple-tag siimple-tag--primary siimple-tag--rounded">
            {frequency > 999 ? Math.trunc(frequency / 1000) + 'k+' : frequency}
          </span>
        </>
    }
    {
      isEditing && <EditorComponent
        content={content}
        confirm={(text: string) => {
          updateItem({ id, category, frequency, content: text });
          setIsEditing(false);
          setIsOver(false);
          setIsDeleting(false);
        }}
        cancel={() => {
          setIsEditing(false);
          setIsOver(false);
          setIsDeleting(false);
        }}
      />
    }
    {
      isDeleting && <ConfirmComponent
        content={content}
        confirm={() => {
          removeItem(id);
          setIsEditing(false);
          setIsOver(false);
          setIsDeleting(false);
        }}
        cancel={() => {
          setIsEditing(false);
          setIsOver(false);
          setIsDeleting(false);
        }}
      />
    }
  </StyledItem>;
};
