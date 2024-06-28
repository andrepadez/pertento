export const OrgWebsiteSelectors = ({ c }) => {
  const companies = c.get('companies');
  const org = +c.get('org');
  return (
    <div class="flex gap-5">
      <Selector name="companies" options={companies} selected={companies.find((c) => c.id === org)} />
      {/* <div>Website</div> */}
    </div>
  );
};

const Selector = ({ name, options, selected, prop = 'friendlyName' }) => {
  return (
    <div class="relative flex h-20 flex-col justify-center">
      <details class="text-left">
        <summary className="list-none [&::-webkit-details-marker]:hidden">
          <div className="w-64 px-4 py-2 text-black bg-white rounded-lg">
            <div class="flex items-center justify-between">
              <span>{selected[prop]}</span>
              <i class="h-4 w-4" data-lucide="chevrons-up-down"></i>
            </div>
          </div>
        </summary>
        <div class="absolute rounded-lg border-2 border-gray-300 bg-white pb-4 pt-2 text-black">
          <input type="text" list={`datalist-${name}`} />
          <datalist class="max-h-96" id={`datalist-${name}`}>
            {options.map((option) => (
              <option value={option[prop]}>
                <a href="/"></a>
              </option>
            ))}
          </datalist>

          {/* <ul class="flex max-h-64 flex-col gap-2 overflow-auto">
            {options.map((option) => (
              <li>
                <a href={`/${option.id}`}>{option[prop]}</a>
              </li>
            ))}
          </ul> */}
        </div>
      </details>
    </div>
  );
};
