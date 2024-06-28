import { Table } from './Table';
import { Thead } from './Thead';
import { Tcell } from './Tcell';

export const DataTable = ({ data, columns }) => {
  return (
    <Table>
      <Thead columns={columns} />
      <tbody class="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
        {data.map((row) => (
          <tr>
            {columns.map((col) => (
              <Tcell value={row[col.field]} row={row} data={data} column={col} field={col.field} />
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

{
  /* <td class="whitespace-nowrap px-12 py-4 text-sm font-medium">
              <div class="inline gap-x-2 rounded-full bg-emerald-100/60 px-3 py-1 text-sm font-normal text-emerald-500 dark:bg-gray-800">
                Customer
              </div>
            </td>
            <td class="whitespace-nowrap px-4 py-4 text-sm">
              <div>
                <h4 class="text-gray-700 dark:text-gray-200">Content curating app</h4>
                <p class="text-gray-500 dark:text-gray-400">Brings all your news into one place</p>
              </div>
            </td>
            <td class="whitespace-nowrap px-4 py-4 text-sm">
              <div class="flex items-center">
                <img
                  class="-mx-1 h-6 w-6 shrink-0 rounded-full border-2 border-white object-cover dark:border-gray-700"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
                  alt=""
                />
                <img
                  class="-mx-1 h-6 w-6 shrink-0 rounded-full border-2 border-white object-cover dark:border-gray-700"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
                  alt=""
                />
                <img
                  class="-mx-1 h-6 w-6 shrink-0 rounded-full border-2 border-white object-cover dark:border-gray-700"
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1256&q=80"
                  alt=""
                />
                <img
                  class="-mx-1 h-6 w-6 shrink-0 rounded-full border-2 border-white object-cover dark:border-gray-700"
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
                  alt=""
                />
                <p class="-mx-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-blue-100 text-xs text-blue-600">
                  +4
                </p>
              </div>
            </td>

            <td class="whitespace-nowrap px-4 py-4 text-sm">
              <div class="h-1.5 w-48 overflow-hidden rounded-full bg-blue-200">
                <div class="h-1.5 w-2/3 bg-blue-500"></div>
              </div>
            </td>

            <td class="whitespace-nowrap px-4 py-4 text-sm">
              <button class="rounded-lg px-1 py-1 text-gray-500 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                  />
                </svg>
              </button>
            </td> */
}

{
  /* <tr>
          <td class="whitespace-nowrap px-4 py-4 text-sm font-medium">
            <div>
              <h2 class="font-medium text-gray-800 dark:text-white">Circooles</h2>
              <p class="text-sm font-normal text-gray-600 dark:text-gray-400">getcirooles.com</p>
            </div>
          </td>
          <td class="whitespace-nowrap px-12 py-4 text-sm font-medium">
            <div class="inline gap-x-2 rounded-full bg-gray-100 px-3 py-1 text-sm font-normal text-gray-500 dark:bg-gray-800 dark:text-gray-400">
              Churned
            </div>
          </td>
          <td class="whitespace-nowrap px-4 py-4 text-sm">
            <div>
              <h4 class="text-gray-700 dark:text-gray-200">Design software</h4>
              <p class="text-gray-500 dark:text-gray-400">Super lightweight design app</p>
            </div>
          </td>
          <td class="whitespace-nowrap px-4 py-4 text-sm">
            <div class="flex items-center">
              <img
                class="-mx-1 h-6 w-6 shrink-0 rounded-full border-2 border-white object-cover dark:border-gray-700"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
                alt=""
              />
              <img
                class="-mx-1 h-6 w-6 shrink-0 rounded-full border-2 border-white object-cover dark:border-gray-700"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
                alt=""
              />
              <img
                class="-mx-1 h-6 w-6 shrink-0 rounded-full border-2 border-white object-cover dark:border-gray-700"
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1256&q=80"
                alt=""
              />
              <img
                class="-mx-1 h-6 w-6 shrink-0 rounded-full border-2 border-white object-cover dark:border-gray-700"
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
                alt=""
              />
              <p class="-mx-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-blue-100 text-xs text-blue-600">
                +4
              </p>
            </div>
          </td>

          <td class="whitespace-nowrap px-4 py-4 text-sm">
            <div class="h-1.5 w-48 overflow-hidden rounded-full bg-blue-200">
              <div class="h-1.5 w-2/5 bg-blue-500"></div>
            </div>
          </td>

          <td class="whitespace-nowrap px-4 py-4 text-sm">
            <button class="rounded-lg px-1 py-1 text-gray-500 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                />
              </svg>
            </button>
          </td>
        </tr>

        <tr>
          <td class="whitespace-nowrap px-4 py-4 text-sm font-medium">
            <div>
              <h2 class="font-medium text-gray-800 dark:text-white">Sisyphus</h2>
              <p class="text-sm font-normal text-gray-600 dark:text-gray-400">sisyphus.com</p>
            </div>
          </td>
          <td class="whitespace-nowrap px-12 py-4 text-sm font-medium">
            <div class="inline gap-x-2 rounded-full bg-emerald-100/60 px-3 py-1 text-sm font-normal text-emerald-500 dark:bg-gray-800">
              Customer
            </div>
          </td>
          <td class="whitespace-nowrap px-4 py-4 text-sm">
            <div>
              <h4 class="text-gray-700 dark:text-gray-200">Automation and workflow</h4>
              <p class="text-gray-500 dark:text-gray-400">Time tracking, invoicing and expenses</p>
            </div>
          </td>
          <td class="whitespace-nowrap px-4 py-4 text-sm">
            <div class="flex items-center">
              <img
                class="-mx-1 h-6 w-6 shrink-0 rounded-full border-2 border-white object-cover dark:border-gray-700"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
                alt=""
              />
              <img
                class="-mx-1 h-6 w-6 shrink-0 rounded-full border-2 border-white object-cover dark:border-gray-700"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
                alt=""
              />
              <img
                class="-mx-1 h-6 w-6 shrink-0 rounded-full border-2 border-white object-cover dark:border-gray-700"
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1256&q=80"
                alt=""
              />
              <img
                class="-mx-1 h-6 w-6 shrink-0 rounded-full border-2 border-white object-cover dark:border-gray-700"
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
                alt=""
              />
              <p class="-mx-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-blue-100 text-xs text-blue-600">
                +4
              </p>
            </div>
          </td>

          <td class="whitespace-nowrap px-4 py-4 text-sm">
            <div class="h-1.5 w-48 overflow-hidden rounded-full bg-blue-200">
              <div class="h-1.5 w-11/12 bg-blue-500"></div>
            </div>
          </td>

          <td class="whitespace-nowrap px-4 py-4 text-sm">
            <button class="rounded-lg px-1 py-1 text-gray-500 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                />
              </svg>
            </button>
          </td>
        </tr>

        <tr>
          <td class="whitespace-nowrap px-4 py-4 text-sm font-medium">
            <div>
              <h2 class="font-medium text-gray-800 dark:text-white">Hourglass</h2>
              <p class="text-sm font-normal text-gray-600 dark:text-gray-400">hourglass.app</p>
            </div>
          </td>
          <td class="whitespace-nowrap px-12 py-4 text-sm font-medium">
            <div class="inline gap-x-2 rounded-full bg-gray-100 px-3 py-1 text-sm font-normal text-gray-500 dark:bg-gray-800 dark:text-gray-400">
              Churned
            </div>
          </td>
          <td class="whitespace-nowrap px-4 py-4 text-sm">
            <div>
              <h4 class="text-gray-700 dark:text-gray-200">Productivity app</h4>
              <p class="text-gray-500 dark:text-gray-400">Time management and productivity</p>
            </div>
          </td>
          <td class="whitespace-nowrap px-4 py-4 text-sm">
            <div class="flex items-center">
              <img
                class="-mx-1 h-6 w-6 shrink-0 rounded-full border-2 border-white object-cover dark:border-gray-700"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
                alt=""
              />
              <img
                class="-mx-1 h-6 w-6 shrink-0 rounded-full border-2 border-white object-cover dark:border-gray-700"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
                alt=""
              />
              <img
                class="-mx-1 h-6 w-6 shrink-0 rounded-full border-2 border-white object-cover dark:border-gray-700"
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1256&q=80"
                alt=""
              />
              <img
                class="-mx-1 h-6 w-6 shrink-0 rounded-full border-2 border-white object-cover dark:border-gray-700"
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
                alt=""
              />
              <p class="-mx-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-blue-100 text-xs text-blue-600">
                +4
              </p>
            </div>
          </td>

          <td class="whitespace-nowrap px-4 py-4 text-sm">
            <div class="h-1.5 w-48 overflow-hidden rounded-full bg-blue-200">
              <div class="h-1.5 w-1/3 bg-blue-500"></div>
            </div>
          </td>

          <td class="whitespace-nowrap px-4 py-4 text-sm">
            <button class="rounded-lg px-1 py-1 text-gray-500 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                />
              </svg>
            </button>
          </td>
        </tr>

        <tr>
          <td class="whitespace-nowrap px-4 py-4 text-sm font-medium">
            <div>
              <h2 class="font-medium text-gray-800 dark:text-white">Quotient</h2>
              <p class="text-sm font-normal text-gray-600 dark:text-gray-400">quotient.co</p>
            </div>
          </td>
          <td class="whitespace-nowrap px-12 py-4 text-sm font-medium">
            <div class="inline gap-x-2 rounded-full bg-emerald-100/60 px-3 py-1 text-sm font-normal text-emerald-500 dark:bg-gray-800">
              Customer
            </div>
          </td>
          <td class="whitespace-nowrap px-4 py-4 text-sm">
            <div>
              <h4 class="text-gray-700 dark:text-gray-200">Sales CRM</h4>
              <p class="text-gray-500 dark:text-gray-400">Web-based sales doc management</p>
            </div>
          </td>
          <td class="whitespace-nowrap px-4 py-4 text-sm">
            <div class="flex items-center">
              <img
                class="-mx-1 h-6 w-6 shrink-0 rounded-full border-2 border-white object-cover dark:border-gray-700"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
                alt=""
              />
              <img
                class="-mx-1 h-6 w-6 shrink-0 rounded-full border-2 border-white object-cover dark:border-gray-700"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
                alt=""
              />
              <img
                class="-mx-1 h-6 w-6 shrink-0 rounded-full border-2 border-white object-cover dark:border-gray-700"
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1256&q=80"
                alt=""
              />
              <img
                class="-mx-1 h-6 w-6 shrink-0 rounded-full border-2 border-white object-cover dark:border-gray-700"
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
                alt=""
              />
              <p class="-mx-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-blue-100 text-xs text-blue-600">
                +4
              </p>
            </div>
          </td>

          <td class="whitespace-nowrap px-4 py-4 text-sm">
            <div class="h-1.5 w-48 overflow-hidden rounded-full bg-blue-200">
              <div class="h-1.5 w-1/6 bg-blue-500"></div>
            </div>
          </td>

          <td class="whitespace-nowrap px-4 py-4 text-sm">
            <button class="rounded-lg px-1 py-1 text-gray-500 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                />
              </svg>
            </button>
          </td>
        </tr> */
}
