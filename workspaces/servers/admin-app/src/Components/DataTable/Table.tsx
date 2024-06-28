export const Table = ({ children }) => {
  return (
    <div class="mt-6 flex flex-col">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="overflow-hidden border border-gray-200 md:rounded-lg dark:border-gray-700">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">{children}</table>
          </div>
        </div>
      </div>
    </div>
  );
};
