import { Details } from '@/Components/Details';
import LINKS from '../links.json';

export const UserDropdown = ({ c, user }) => {
  const { company, website } = c.var;
  const qs = `?org=${company.id}&ws=${website.id}`;

  return (
    <Details class="group list-none before:hidden">
      <summary class="cursor-pointer list-none text-xl [&::-webkit-details-marker]:hidden">
        <div class="flex items-center justify-end gap-5 lg:w-96">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 lg:h-12 lg:w-12">
            {user.avatar ? (
              <img src={user.avatar} alt="avatar" />
            ) : (
              <i class="h-6 w-6 text-black lg:h-8 lg:w-8" data-lucide="user"></i>
            )}
          </div>
          <div class="hidden flex-col lg:flex">
            <div class="text-sm text-gray-400">{user.company}</div>
            <div class="text-lg">{`${user.firstName} ${user.lastName}`}</div>
          </div>
          <i
            data-lucide="chevron-down"
            class="hidden h-6 w-6 text-white transition-all group-open:rotate-180 lg:inline"
          ></i>
        </div>
      </summary>
      <div class="fixed left-[5vw] w-[90vw] lg:left-auto lg:right-6 lg:w-64">
        <div class="mt-6 text-black">
          <ul class="rounded-lg border-2 border-gray-300 bg-white pb-4 pt-2">
            <li class="flex flex-col gap-3 py-3 pl-4 pt-2 lg:hidden">
              <div className="flex">
                <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                  <i class="h-8 w-8" data-lucide="user"></i>
                </div>
                <div class="flex flex-col justify-center pl-4">
                  <div class="text-lg">
                    {user.firstName} {user.lastName}
                  </div>
                  <div class="text-lg">{user.company}</div>
                </div>
              </div>
              <hr />
            </li>
            {LINKS.toSorted((a, b) => a.sm - b.sm).map((link) => {
              return (
                link.sm && (
                  <li class="flex flex-col gap-3 py-3 pl-4 pr-2 pt-2">
                    <div className="flex">
                      <div class="flex h-12 w-12 items-center justify-center rounded-lg">
                        <i class="h-8 w-8" data-lucide={link.icon}></i>
                      </div>
                      <div class="flex flex-col justify-center pl-4">
                        <a href={link.href + qs} class="text-lg">
                          {link.label}
                        </a>
                      </div>
                    </div>
                    <hr />
                  </li>
                )
              );
            })}

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
    </Details>
  );
};
