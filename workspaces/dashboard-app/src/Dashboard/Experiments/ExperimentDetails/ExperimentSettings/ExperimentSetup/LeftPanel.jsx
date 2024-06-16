import { CheckMark } from 'components/CheckMark';

export const LeftPanel = ({ step }) => {
  return (
    <>
      <div className="relative">
        <div className="flex h-20 col-span-1 gap-3">
          <div className="mt-2">{step === 1 ? <IconTarget /> : <CheckMark />}</div>
          <div>
            <h4 className="">Step 1</h4>
            <p className="text-sm text-muted-foreground">Editor Page</p>
          </div>
        </div>
        <div className="absolute w-[2px] h-12 ml-[14px] -mt-8 bg-gray-300"></div>
        <div className="flex items-center h-20 col-span-1 gap-3">
          {step === 2 ? <IconTarget /> : <IconEmpty />}
          <div>
            <h4 className="">Step 2</h4>
            <p className="text-sm text-muted-foreground">Variant Name</p>
          </div>
        </div>
      </div>
    </>
  );
};

const IconTarget = () => {
  return (
    <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-[#10b981]">
      <div className="w-3 h-3 rounded-full  bg-[#10b981]"></div>
    </div>
  );
};

const IconEmpty = () => {
  return <div className="w-8 h-8 border-2 border-gray-400 rounded-full"></div>;
};
