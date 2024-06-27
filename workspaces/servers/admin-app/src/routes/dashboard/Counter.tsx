export const Counter = ({ count = 5 }) => {
  const MIN = 0;
  const MAX = 10;
  return (
    <div id="counter-component">
      <div class="mx-auto flex w-full justify-around">
        <button
          class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
          hx-post={`/decrement/${count}`}
          hx-swap="outerHTML"
          hx-target="#counter-component"
          disabled={count <= MIN}
        >
          Decrement
        </button>
        <span class="w-10 text-5xl">{count}</span>
        <button
          class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
          hx-post={`/increment/${count}`}
          hx-swap="outerHTML"
          hx-target="#counter-component"
          disabled={count >= MAX}
        >
          Increment
        </button>
      </div>
    </div>
  );
};
