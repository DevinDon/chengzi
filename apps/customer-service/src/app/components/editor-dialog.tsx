import { DialogComponent } from '@chengzi-tools/dialog';
import { FullModalWithTransitionComponent } from '@chengzi-tools/full-modal';
import { Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';
import { Item, ItemArgs, useItemInsert, useItemUpdate } from '../states';

const StyledTextarea = tw.textarea`
  block
  max-w-lg w-full
  text-gray-700
  border border-gray-300
  rounded shadow
  hover:shadow-lg
  focus:ring-yellow-500 focus:border-yellow-500
`;

interface Props {
  item: Item | ItemArgs;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}

export const EditorDialogComponent = ({ item, isVisible, setIsVisible }: Props) => {

  const [newItem, setNewItem] = useState<Props['item']>(item);

  const update = useItemUpdate();
  const insert = useItemInsert();
  const confirm = () => {
    if (item) {
      update(newItem as Item);
    } else {
      insert(newItem as Item);
    }
    setIsVisible(false);
  };
  const cancel = () => setIsVisible(false);

  useEffect(() => {
    setNewItem(item);
  }, [item]);

  return <FullModalWithTransitionComponent
    isVisible={isVisible}
    onClick={cancel}
    dark={true}
  >
    <Transition.Child
      as={Fragment}
      enter="transform transition duration-300 ease-out origin-bottom md:origin-center"
      enterFrom="translate-y-48 md:scale-0"
      enterTo="translate-y-0 md:scale-100"
      leave="transform transition duration-200 ease-out origin-bottom md:origin-center"
      leaveFrom="translate-y-0 md:scale-100"
      leaveTo="translate-y-48 md:scale-0"
    >
      <DialogComponent title={item.id ? '更新便捷短语' : '新增便捷短语'} actions={{ cancel, confirm }} >
        <StyledTextarea
          value={newItem?.content}
          placeholder="请输入便捷短语内容"
          onChange={e => setNewItem({ ...newItem, content: e.currentTarget.value })}
        />
      </DialogComponent>
    </Transition.Child>
  </FullModalWithTransitionComponent>;

};

export default EditorDialogComponent;
