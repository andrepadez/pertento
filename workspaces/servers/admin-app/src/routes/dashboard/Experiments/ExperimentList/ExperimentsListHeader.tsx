import { ButtonWithDialog } from '@/Components/ButtonWithDialog';

export const ExperimentsListHeader = () => {
  return (
    <div class="mt-2 flex items-center justify-end lg:mt-4">
      <ButtonWithDialog action="New Experiment">
        <form class="flex w-96 flex-col gap-3">
          <h3>Create Experiment</h3>
          <label className="text-sm text-muted">Choose a discriptive name for your new experiment</label>
          <input
            class="w-full rounded-lg border-4 border-blue-500 px-3 py-1 outline-offset-4 outline-blue-500"
            type="text"
            name="name"
          />
          <div className="mt-3 flex justify-end gap-5">
            <button
              class="flex items-center justify-between gap-x-2 rounded-lg bg-gray-300 px-5 py-2 text-sm tracking-wide transition-colors duration-200 hover:bg-gray-600 sm:w-auto dark:bg-gray-600 dark:hover:bg-gray-500"
              formmethod="dialog"
            >
              Cancel
            </button>
            <button class="flex items-center justify-between gap-x-2 rounded-lg bg-blue-500 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 hover:bg-blue-600 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-500">
              Create
            </button>
          </div>
        </form>
      </ButtonWithDialog>
    </div>
  );
};
