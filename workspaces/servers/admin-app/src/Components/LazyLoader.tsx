export const LazyLoader = ({ children, url }) => {
  return (
    <div hx-target="this" hx-swap="outerHTML" hx-trigger="load" hx-get={url}>
      <h1>Loading....</h1>
    </div>
  );
};
