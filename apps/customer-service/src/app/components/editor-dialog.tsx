import { DialogComponent } from '@chengzi-tools/dialog';
import { FullModalWithTransitionComponent } from '@chengzi-tools/full-modal';
import { Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';
import { Item, ItemArgs, useCategorySelect, useItemInsert, useItemUpdate } from '../states';

const StyledTextarea = tw.textarea`
  block
  max-w-lg w-full h-32
  text-gray-700
  border border-gray-300
  transition
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
  const [isValid, setIsValid] = useState(true);

  const select = useCategorySelect();
  const insert = useItemInsert();
  const update = useItemUpdate();
  const confirm = () => {
    if (!newItem.content) {
      setIsValid(false);
      return;
    }
    if (item.id) {
      update(newItem as Item);
    } else {
      insert(newItem as Item);
    }
    setIsVisible(false);
  };
  const cancel = () => setIsVisible(false);

  useEffect(() => { setNewItem(item); }, [item]);

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
      <DialogComponent title={item.id ? '更新便捷短语' : `新增“${select(item.category)?.name || '未分类'}”系列短语`} actions={{ cancel, confirm }} >
        <StyledTextarea
          className={isValid ? '' : 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'}
          value={newItem?.content}
          placeholder="请输入便捷短语内容"
          onChange={e => {
            const content = e.currentTarget.value;
            setIsValid(!!content);
            setNewItem({ ...newItem, content });
          }}
        />
      </DialogComponent>
    </Transition.Child>
  </FullModalWithTransitionComponent>;

};

export default EditorDialogComponent;
