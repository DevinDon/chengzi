import { useState } from 'react';
import styled from 'styled-components';

const StyledFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  > button:last-child {
    margin-left: 1rem;
  }
`;

interface Props {
  content: string;
  confirm: (text: string) => void;
  cancel: () => void;
}

export default ({ content, confirm, cancel }: Props) => {

  const [text, setText] = useState(content);

  return <div className="siimple-modal siimple-modal--small">
    <div className="siimple-modal-content">
      <div className="siimple-modal-header">
        <div className="siimple-modal-header-title">编辑常用短语</div>
        <div className="siimple-modal-header-close" onClick={cancel}></div>
      </div>
      <div className="siimple-modal-body">
        <textarea
          className="siimple-textarea siimple-textarea--fluid"
          rows={3}
          value={text}
          onInput={e => setText(e.currentTarget.value)}
          placeholder="在这里输入你的短语……"
        ></textarea>
      </div>
      <StyledFooter className="siimple-modal-footer">
        <button className="siimple-btn siimple-btn--error" onClick={cancel}>取消</button>
        <button className="siimple-btn siimple-btn--primary" onClick={() => confirm(text)}>确认</button>
      </StyledFooter>
    </div>
  </div>;

}
