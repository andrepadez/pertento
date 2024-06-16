import { useContextMenu } from '@/state/useContextMenu';
import { cn } from 'helpers/cn';

export const HierarchyMember = (props) => {
  const { member, idx, isLast, isTheMember, handleSelect } = props;
  const { openContextMenu } = useContextMenu();

  const onClick = (ev) => {
    ev.preventDefault();
    handleSelect(idx);
  };

  const onContextMenu = (ev) => {
    ev.preventDefault();
    handleSelect(idx);
    openContextMenu({ clientX: ev.clientX + 50, clientY: ev.clientY - 200, isHierarchy: true });
  };

  return (
    <>
      <a
        className={cn(
          'mx-3 text-white hover:no-underline',
          isTheMember && 'font-bold',
          !isTheMember && 'underline cursor-pointer',
        )}
        onClick={onClick}
        onContextMenu={onContextMenu}
      >
        {member.tagName}
      </a>
      {!isLast && ' > '}
    </>
  );
};
