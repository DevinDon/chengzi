import styled from 'styled-components';
import { Item } from '../data';

type Props = Item;

const StyledItem = styled.li`
width: 300px;

:active {
  filter: brightness(0.9);
}
`;

export default ({ frequency, content }: Props) => <StyledItem className="siimple-list-item" data-clipboard-text={content}>
  <span className="content">{content}</span>
  <span className="siimple-tag siimple-tag--primary siimple-tag--rounded">
    {frequency > 999 ? Math.trunc(frequency / 1000) + 'k+' : frequency}
  </span>
</StyledItem>;
