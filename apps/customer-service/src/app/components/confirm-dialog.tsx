import { DialogComponent } from '@chengzi-tools/dialog';
import { FullModalWithTransitionComponent } from '@chengzi-tools/full-modal';
import { Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Item, useItemRemove } from '../states';

interface Props {
  item: Item;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}

export const ConfirmDialogComponent = ({ item, isVisible, setIsVisible }: Props) => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const confirm = () => useItemRemove()(item.id);
  const cancel = () => setIsVisible(false);

  return <FullModalWithTransitionComponent
    isVisible={isVisible}
    onClick={cancel}
    dark={true}
  >
    <Transition.Child
      as="div"
      enter="transform transition duration-300 ease-out origin-bottom md:origin-center"
      enterFrom="translate-y-48 md:scale-0"
      enterTo="translate-y-0 md:scale-100"
      leave="transform transition duration-200 ease-out origin-bottom md:origin-center"
      leaveFrom="translate-y-0 md:scale-100"
      leaveTo="translate-y-48 md:scale-0"
    >
      <DialogComponent title="删除确认" actions={{ cancel, confirm }}>
        确认要删除“<i>{item.content}</i>”吗？
      </DialogComponent>
    </Transition.Child>
  </FullModalWithTransitionComponent>;

};

export default ConfirmDialogComponent;
