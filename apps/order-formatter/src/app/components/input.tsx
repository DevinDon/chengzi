import { useConfig, useUpdateAutoClear } from '../states';
import { StyledContainer } from './container';

interface Props {
  input: string;
  setInput: (input: string) => void;
}

export default ({ input, setInput }: Props) => {

  const { autoClear } = useConfig();
  const updateAutoClear = useUpdateAutoClear();

  return <StyledContainer>
    <label
      className="textarea siimple-label"
      htmlFor="input"
    >在此输入原始文本内容</label>

    <div className="switch">
      <label htmlFor="autoClear" className="siimple-label">自动粘贴</label>
      <div className="siimple-switch">
        <input type="checkbox" id="autoClear" onChange={e => updateAutoClear(e.target.checked)} checked={autoClear} />
        <label htmlFor="autoClear"></label>
      </div>
    </div>

    <textarea
      className="siimple-textarea siimple-textarea--fluid"
      name="input"
      id="input"
      rows={15}
      placeholder="在这里输入需要被格式化的原始文本……"
      onInput={e => setInput(e.currentTarget.value)}
      value={input}
      onClick={async e => autoClear ? setInput(await navigator.clipboard.readText()) : e.currentTarget.select()}
    ></textarea>
  </StyledContainer>;

};
