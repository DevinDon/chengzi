import { useEffect, useState } from 'react';
import styled from 'styled-components';
import InputComponent from './components/input';
import OutputComponent from './components/output';
import { useConfig } from './states';

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 1rem;
`;

const StyledTwoLine = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;

  margin: 3rem 0;
  width: 100%;
`;

export default () => {

  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const { autoCopy } = useConfig();

  const formatOrder = (order: string) => order
    .replace(/:\s+/g, '：')
    .replace(/:$/gm, '：')
    .replace(/\n/g, ' ')
    .replace(/\s(.{3,6}：)/g, '\n$1')
    .replace(/\s订单号：/, '\n订单号：')
    .replace(/^\s+/gm, '')
    .replace(/\s+$/gm, '')
    .trim();

  // auto format
  useEffect(() => {
    setOutput(formatOrder(input));
  }, [input]);

  // auto copy
  useEffect(() => {
    autoCopy && output && navigator.clipboard.writeText(output);
  }, [output, autoCopy]);

  return <StyledApp>
    <h1 className="siimple-h1">订单文本格式化工具</h1>
    <h2 className="siimple-h2 siimple--color-warning">小橙子专属</h2>

    <StyledTwoLine>
      <InputComponent {...{ input, setInput }} />
      <OutputComponent output={output} />
    </StyledTwoLine>
  </StyledApp>;

};
