import { ChevronDown, Building, User, LogOut } from 'lucide-react';

export const Header = ({ user }) => {
  return (
    <header class="fixed z-50 w-full">
      <div class="flex h-20 items-center justify-between bg-[#101828] px-8 text-white">
        <div>
          <img class="h-20" src="/pertento_dark.png" alt="pertento logo" />
        </div>
        <details class="group before:hidden">
          <summary class="cursor-pointer list-none text-xl">
            <div class="flex w-96 items-center justify-end gap-5">
              <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                <i class="h-8 w-8 text-black" data-lucide="user"></i>
              </div>
              <div class="flex flex-col">
                <div class="text-sm text-gray-400">{user.company}</div>
                <div class="text-lg">{`${user.firstName} ${user.lastName}`}</div>
              </div>
              <i data-lucide="chevron-down" class="h-6 w-6 text-white transition-all group-open:rotate-180"></i>
            </div>
          </summary>
          <div class="absolute">
            <div class="ml-6 mt-6 w-96 text-black">
              <ul class="rounded-lg border-2 border-gray-300 bg-white pb-4 pt-2">
                <li class="flex flex-col gap-3 py-3 pl-4 pt-2">
                  <div className="flex">
                    <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                      <i class="h-8 w-8" data-lucide="user"></i>
                    </div>
                    <div class="flex flex-col justify-center pl-4">
                      <div class="text-lg">{user.company}</div>
                    </div>
                  </div>
                  <hr />
                </li>
                <li class="flex flex-col gap-3 py-3 pl-4 pr-2 pt-2">
                  <div className="flex">
                    <div class="flex h-12 w-12 items-center justify-center rounded-lg">
                      <i class="h-8 w-8" data-lucide="building"></i>
                    </div>
                    <div class="flex flex-col justify-center pl-4">
                      <div class="text-lg">Organization</div>
                    </div>
                  </div>
                  <hr />
                </li>
                <li class="flex flex-col gap-3 py-3 pl-4 pr-2 pt-2">
                  <div className="flex">
                    <div class="flex h-12 w-12 items-center justify-center rounded-lg">
                      <i class="h-8 w-8" data-lucide="user"></i>
                    </div>
                    <div class="flex flex-col justify-center pl-4">
                      <div class="text-lg">Account</div>
                    </div>
                  </div>
                  <hr />
                </li>
                <li class="flex flex-col gap-3 py-3 pl-4 pr-2 pt-2">
                  <div className="flex">
                    <div class="flex h-12 w-12 items-center justify-center rounded-lg">
                      <i class="h-8 w-8" data-lucide="log-out"></i>
                    </div>
                    <div class="flex flex-col justify-center pl-4">
                      <a href="/auth/signout" class="text-lg">
                        Signout
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
};
