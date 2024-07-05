export const ToasterProvider = ({ children }) => {
  return <div class="fixed top-0 z-50 flex w-full justify-center">{children}</div>;
};

export const Toast = ({}) => {
  return (
    <ToasterProvider>
      <div class="animate-toaster mt-12 rounded-lg border-4 bg-white p-5" id="toast">
        Test Toaster
      </div>
    </ToasterProvider>
  );
};
