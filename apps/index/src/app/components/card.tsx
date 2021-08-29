import { ReactNode } from 'react';
import styled from 'styled-components';

const StyledCard = styled.li`
  max-width: 350px;
  min-width: 300px;
`;

interface Props {
  title: string;
  desc?: string;
  footer?: string;
  children?: ReactNode;
}

export default ({ title, desc = '橙子专属', footer = '版权所有 © 小橙子 2021+', children }: Props) => <StyledCard className="siimple-card">
  <div className="siimple-card-body">
    <div className="siimple-card-title">{title}</div>
    <div className="siimple-card-subtitle">{desc}</div>
    <div className="siimple-card-body">{children}</div>
    <div className="siimple-card-footer">
      <small className="siimple-small">{footer}</small>
    </div>
  </div>
</StyledCard>;
