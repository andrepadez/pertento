const { BUILD_ENV } = process.env;
const isProduction = BUILD_ENV === 'production';

export const LazyLoader = ({ children, ...props }) => {
  const url = new URL(props.url);
  url.protocol = isProduction ? 'https' : 'http';
  return (
    <div hx-target="this" hx-swap="outerHTML" hx-trigger="load" hx-get={url}>
      <h1>Loading....</h1>
    </div>
  );
};
