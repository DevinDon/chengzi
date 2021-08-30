import { useState } from 'react';
import styled from 'styled-components';
import { Item, useItemRemove, useItemUpdate, useItemUpdateFrequency } from '../states';
import { ConfirmComponent } from './dialog/confirm';
import { EditorComponent } from './dialog/editor';

type Props = Item;

// list item
const StyledItem = styled.li`
  width: 300px;
  height: 24px;
  position: relative;
  overflow: hidden;
`;

// item content
const StyledContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: inherit;
  width: inherit;

  position: absolute;
  top: 0;
  left: 0;

  transition: all 0.3s ease-in-out 0.15s;
  transform: translateY(0);

  &.hover {
    transform: translateY(-200%);
  }
`;

// item text
const StyledText = styled.span`
  display: inline-block;
  width: 90%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

// item badge
const StyledBadge = styled.span`
  line-height: 20px;
  height: 20px;
`;

// actions
const StyledActions = styled.div`
  display: flex;
  flex-direction: row;

  padding: inherit;
  width: inherit;

  position: absolute;
  top: 0;
  left: 0;

  transition: all 0.3s ease-in-out 0.15s;
  transform: translateY(200%);

  &.hover {
    transform: translateY(0);
  }

  > span {
    flex-grow: 1;
    height: 100%;
    text-align: center;
    overflow: hidden;

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

export const ItemComponent = ({ id, content, category, frequency }: Props) => {

  const [isOver, setIsOver] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const updateFrequency = useItemUpdateFrequency();
  const removeItem = useItemRemove();
  const updateItem = useItemUpdate();

  const copy = () => {
    navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
    updateFrequency(id);
  };

  return <>
    <StyledItem
      className="siimple-list-item"
      onMouseEnter={() => setIsOver(true)}
      onMouseLeave={() => setIsOver(false)}
      title={content}
    >
      <StyledContent className={isOver ? 'hover' : ''}>
        <StyledText>{content}</StyledText>
        <StyledBadge className="siimple-tag siimple-tag--primary siimple-tag--rounded">
          {frequency > 999 ? Math.trunc(frequency / 1000) + 'k+' : frequency}
        </StyledBadge>
      </StyledContent>
      <StyledActions className={isOver ? 'hover' : ''}>
        <span onClick={() => setIsDeleting(true)}>删除</span>
        <span onClick={() => setIsEditing(true)}>编辑</span>
        <span className={isCopied ? 'copied' : ''} onClick={isCopied ? undefined : copy}>{isCopied ? '复制成功' : '点击复制'}</span>
      </StyledActions>
    </StyledItem>

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
  </>;
};

export default ItemComponent;
