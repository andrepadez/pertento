import { stringifyFunction } from 'helpers/stringify-function';

export const OrgWebsiteSelectors = ({ ctx }) => {
  const { companies, company, website, nextUrl } = ctx.var;
  const { websites } = company;

  const onChangeOrg = function (ev) {
    const el = ev.currentTarget;
    const value = el.value.split(' - ').at(1);
    if (!value) {
      el.value = '';
      el.blur();
      return;
    }

    const url = new window.URL(window.location.href);
    url.pathname = url.pathname.startsWith('/experiments') ? '/experiments' : url.pathname;
    url.searchParams.set('org', value);
    url.searchParams.delete('ws');
    window.location.href = url.toString();
  };

  const onChangeWebsite = function (ev) {
    const el = ev.currentTarget;
    const value = el.value.split(' - ').at(1);
    if (!value) {
      el.value = '';
      return;
    }
    const url = new window.URL(window.location.href);
    url.pathname = url.pathname.startsWith('/experiments') ? '/experiments' : url.pathname;
    url.searchParams.set('ws', value);
    window.location.replace(url.toString());
  };

  return (
    <div class="flex gap-5">
      <Selector
        name="companies"
        prop="friendlyName"
        onChange={onChangeOrg}
        options={companies}
        selected={companies.find((comp) => comp.id === company.id)}
      />
      <Selector
        name="websites"
        options={websites}
        prop="url"
        onChange={onChangeWebsite}
        selected={websites.find((ws) => ws.id === website.id)}
      />
    </div>
  );
};

const Selector = ({ name, options, selected, prop, onChange }) => {
  return (
    <div class="relative flex h-20 flex-col justify-center">
      <div class="text-left">
        <div className="list-none [&::-webkit-details-marker]:hidden">
          <div className="w-48 overflow-hidden rounded-lg bg-white py-2 pl-2 pr-0 text-black lg:w-64">
            <div class="relative flex items-center">
              <i class="absolute right-1 size-5 lg:right-2" data-lucide="chevrons-up-down"></i>
              <span class="w-[10rem] overflow-hidden text-sm lg:w-auto lg:text-base">{selected[prop]}</span>
              <input
                onchange={stringifyFunction(onChange)}
                class="absolute z-10 w-full opacity-0 focus:opacity-100 focus:outline-none"
                list={`datalist-${name}`}
              />
            </div>
            <datalist open id={`datalist-${name}`}>
              {options.map((option) => (
                <option value={option[prop] + ' - ' + option.id}></option>
              ))}
            </datalist>
          </div>
        </div>
      </div>
    </div>
  );
};
