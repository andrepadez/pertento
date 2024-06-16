import { HierarchyMember } from './HierarchyMember';
import { useSelectedElements } from '@/state/useSelectedElements';
import { cn } from 'helpers/cn';

export const Hierarchy = () => {
  const manager = useSelectedElements();
  const { selectedElements, hierarchyMember, selectMember, clearSelected } = manager;
  const { hierarchy } = selectedElements?.[0] || {};

  return (
    <div className="flex items-center gap-2 px-3 py-1 text-lg text-white bg-blue-500 ">
      <div className="h-[2.25rem] w-full py-1 flex justify-between">
        <div>
          {selectedElements?.length > 1 ? (
            <span>{selectedElements?.length} elements selected</span>
          ) : (
            hierarchy?.map((member, idx) => {
              if (member?.tagName !== undefined) {
                const isLast = idx === hierarchy.length - 1;
                const isTheMember = idx === hierarchyMember;
                return (
                  <HierarchyMember
                    key={idx}
                    idx={idx}
                    member={member}
                    isLast={isLast}
                    isTheMember={isTheMember}
                    handleSelect={selectMember}
                  />
                );
              }
            })
          )}
          &nbsp;
        </div>
      </div>
      <div className="pr-5 text-lg">
        <a className="text-white" onClick={clearSelected}>
          clear
        </a>
      </div>
    </div>
  );
};
