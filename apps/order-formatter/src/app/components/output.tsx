import { useConfig, useUpdateAutoCopy } from '../states';
import { StyledContainer } from './container';

interface Props {
  output: string;
  copy: () => void;
}

export default ({ output, copy }: Props) => {

  const { autoCopy } = useConfig();
  const updateAutoCopy = useUpdateAutoCopy();

  return <StyledContainer>
    <label
      className="textarea siimple-label"
      htmlFor="output"
      style={{ cursor: 'pointer' }}
      onClick={() => copy()}
    >点击此处复制格式化文本</label>

    <div className="switch">
      <label htmlFor="autoCopy" className="siimple-label">自动复制</label>
      <div className="siimple-switch">
        <input type="checkbox" id="autoCopy" onChange={e => updateAutoCopy(e.target.checked)} checked={autoCopy} />
        <label htmlFor="autoCopy"></label>
      </div>
    </div>

    <textarea
      className="siimple-textarea siimple-textarea--fluid"
      readOnly
      name="output"
      id="output"
      rows={15}
      placeholder="这里会显示已被格式化的文本……"
      value={output}
      onClick={() => copy()}
    ></textarea>
  </StyledContainer>;

};
