import { AppContainerComponent } from '@chengzi-tools/app-container';
import { CopyrightComponent } from '@chengzi-tools/copyright';
import { FlexGrowComponent } from '@chengzi-tools/flex-grow';
import { HeadingComponent } from '@chengzi-tools/heading';
import { FailedNotificationComponent, SucceedNotificationComponent } from '@chengzi-tools/notification';
import { useCallback, useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';
import TextareaComponent from './components/textarea';
import { TextareaEventTarget } from './interfaces';
import { useConfig, useUpdateAutoCopy, useUpdateAutoPaste } from './states';
import * as Clipboard from 'clipboard-polyfill';

const StyledTwoLine = tw.div`
  flex
  flex-row
  justify-around
  items-center
  flex-wrap

  p-4
  mt-4
  w-full

  md:space-x-4
`;

export default () => {

  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [isFailedToastVisible, setIsFailedToastVisible] = useState(false);
  const { autoPaste, autoCopy } = useConfig();
  const updateAutoPaste = useUpdateAutoPaste();
  const updateAutoCopy = useUpdateAutoCopy();

  const paste = (value: boolean, target: TextareaEventTarget) => {
    value
      ? Clipboard
        .readText()
        .then(setInput)
        .catch(() => setIsFailedToastVisible(true))
      : target.select();
  };

  const copy = useCallback(
    () => {
      if (!output) { return; }
      Clipboard
        .writeText(output)
        .then(() => setIsToastVisible(true))
        .catch(() => setIsFailedToastVisible(true));
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
    isToastVisible && setTimeout(() => setIsToastVisible(false), 3000);
    isFailedToastVisible && setTimeout(() => setIsFailedToastVisible(false), 3000);
  }, [isToastVisible, isFailedToastVisible]);

  return <AppContainerComponent>
    <HeadingComponent title="订单格式化工具" />

    <StyledTwoLine>
      <TextareaComponent
        title="在此输入原始文本内容"
        content={input}
        setContent={setInput}
        placeholder="请输入原始文本"
        switchTitle="自动粘贴"
        switchValue={autoPaste}
        setSwitchValue={updateAutoPaste}
        onClick={paste}
      />
      <TextareaComponent
        disabled={true}
        title="点此文本框复制输出内容"
        content={output}
        setContent={setOutput}
        placeholder="这里会显示格式化后的文本内容"
        switchTitle="自动复制"
        switchValue={autoCopy}
        setSwitchValue={updateAutoCopy}
        onClick={copy}
      />
    </StyledTwoLine>

    <SucceedNotificationComponent isVisible={isToastVisible} setIsVisible={setIsToastVisible} title="复制成功" message={<>请按 <kbd>Ctrl</kbd> + <kbd>V</kbd> 粘贴</>} />
    <FailedNotificationComponent isVisible={isFailedToastVisible} setIsVisible={setIsFailedToastVisible} title="复制失败" message={<>请检查浏览器是否已开启剪切板权限</>} />

    <FlexGrowComponent />

    <CopyrightComponent />
  </AppContainerComponent>;

};
