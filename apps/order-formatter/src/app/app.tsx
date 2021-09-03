import { AppContainerComponent } from '@chengzi-tools/app-container';
import { CopyrightComponent } from '@chengzi-tools/copyright';
import { FlexGrowComponent } from '@chengzi-tools/flex-grow';
import { HeadingComponent } from '@chengzi-tools/heading';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { InputComponent } from './components/input';
import { OutputComponent } from './components/output';
import { useConfig } from './states';

const StyledTwoLine = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;

  margin: 3rem 0;
  width: 100%;
`;

const StyledToast = styled.div`
  opacity: 0;
  transition: ease-in-out opacity 300ms;

  margin: 0;
  padding: 1rem;
  border-radius: 4px;
  background-color: #3498db;
  color: #ecf0f1;
  box-shadow: 3px 0 8px -4px black;

  width: 10rem;
  text-align: center;

  position: fixed;
  bottom: 2rem;
  left: calc((100vw - 10rem - 2rem) / 2);
  z-index: 2;
`;

export default () => {

  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [shouldShowToast, setShouldShowToast] = useState(false);
  const { autoCopy } = useConfig();

  const copy = useCallback(
    () => {
      if (!output) { return; }
      navigator.clipboard.writeText(output);
      setShouldShowToast(true);
    },
    [output],
  );

  const formatOrder = (order: string) => order
    .replace(/:\s+/g, '：')
    .replace(/:$/gm, '：')
    .replace(/\n/g, ' ')
    .replace(/\s(.{3,6}：)/g, '\r\n$1')
    .replace(/^\s+/gm, '')
    .replace(/\s+$/gm, '')
    .trim();

  // auto format
  useEffect(() => {
    setOutput(formatOrder(input));
  }, [input]);

  // auto copy
  useEffect(() => {
    autoCopy && copy();
  }, [output, autoCopy, copy]);

  // on copied
  useEffect(() => {
    shouldShowToast && setTimeout(() => setShouldShowToast(false), 3000);
  }, [shouldShowToast]);

  return <AppContainerComponent>
    <HeadingComponent title="订单格式化工具" />

    <StyledTwoLine>
      <InputComponent {...{ input, setInput }} />
      <OutputComponent {...{ copy, output }} />
    </StyledTwoLine>

    <StyledToast style={{ opacity: shouldShowToast ? 1 : 0 }}>复制成功，请按 <kbd>Ctrl</kbd> + <kbd>V</kbd> 粘贴</StyledToast>

    <FlexGrowComponent />

    <CopyrightComponent />
  </AppContainerComponent>;

};
