import { AppContainerComponent } from '@chengzi-tools/app-container';
import { CopyrightComponent } from '@chengzi-tools/copyright';
import { FlexGrowComponent } from '@chengzi-tools/flex-grow';
import { HeadingComponent } from '@chengzi-tools/heading';
import { FailedNotificationComponent, SucceedNotificationComponent } from '@chengzi-tools/notification';
import * as Clipboard from 'clipboard-polyfill';
import { useCallback, useEffect, useState } from 'react';
import { useDebounce } from 'react-use';
import tw from 'tailwind-styled-components';
import { TextareaComponent } from './components/textarea';
import { TextareaEventTarget } from './interfaces';
import { useConfig, useUpdateAutoCopy, useUpdateAutoPaste } from './states';

const
  StyledTwoLine = tw.div`
  flex flex-row justify-around items-center flex-wrap
  p-4 mt-4
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

  const paste = (target?: TextareaEventTarget) => {
    autoPaste
      ? Clipboard
        .readText()
        .then(setInput)
        .catch(() => setIsFailedToastVisible(true))
      : target?.select();
  };

  const copy = useCallback(
    (target?: TextareaEventTarget) => {
      if (!output) { return; }
      target?.select();
      const item = new Clipboard.ClipboardItem({
        "text/html": new Blob(
          [`<p>${output.replace(/\n/g, '<br>')}</p>`],
          { type: "text/html" }
        ),
        "text/plain": new Blob(
          [output],
          { type: "text/plain" }
        ),
      });
      Clipboard
        .write([item])
        .then(() => setIsToastVisible(true))
        .catch(() => setIsFailedToastVisible(true));
    },
    [output],
  );

  const formatOrder = (order: string) => order
    .replace(/:\s+/g, '???')
    .replace(/:$/gm, '???')
    .replace(/\n/g, ' ')
    .replace(/\s(.{3,6}???)/g, '\n$1')
    .replace(/^\s+/gm, '')
    .replace(/\s+$/gm, '')
    .trim();

  // auto format
  useDebounce(
    () => setOutput(formatOrder(input)),
    300,
    [input],
  );

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
    <HeadingComponent title="?????????????????????" />

    <StyledTwoLine>
      <TextareaComponent
        title="??????????????????????????????"
        content={input}
        setContent={setInput}
        placeholder="?????????????????????"
        switchTitle="????????????"
        switchValue={autoPaste}
        setSwitchValue={updateAutoPaste}
        onClick={paste}
      />
      <TextareaComponent
        readonly={true}
        title="?????????????????????????????????"
        content={output}
        setContent={setOutput}
        placeholder="??????????????????????????????????????????"
        switchTitle="????????????"
        switchValue={autoCopy}
        setSwitchValue={updateAutoCopy}
        onClick={copy}
      />
    </StyledTwoLine>

    <SucceedNotificationComponent isVisible={isToastVisible} setIsVisible={setIsToastVisible} title="????????????" message={<>?????? <kbd>Ctrl</kbd> + <kbd>V</kbd> ??????</>} />
    <FailedNotificationComponent isVisible={isFailedToastVisible} setIsVisible={setIsFailedToastVisible} title="????????????" message={<>????????????????????????????????????????????????</>} />

    <FlexGrowComponent />

    <CopyrightComponent />
  </AppContainerComponent>;

};
