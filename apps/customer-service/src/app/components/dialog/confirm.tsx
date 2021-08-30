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
  confirm: () => void;
  cancel: () => void;
}

export const ConfirmComponent = ({ content, confirm, cancel }: Props) => {

  return <div className="siimple-modal siimple-modal--small">
    <div className="siimple-modal-content">
      <div className="siimple-modal-header">
        <div className="siimple-modal-header-title">删除常用短语</div>
        <div className="siimple-modal-header-close" onClick={cancel}></div>
      </div>
      <div className="siimple-modal-body">
        确认要删除短语 “{content}” 吗？
      </div>
      <StyledFooter className="siimple-modal-footer">
        <button className="siimple-btn siimple-btn--primary" onClick={cancel}>取消</button>
        <button className="siimple-btn siimple-btn--error" onClick={confirm}>删除</button>
      </StyledFooter>
    </div>
  </div>;

};

export default ConfirmComponent;
