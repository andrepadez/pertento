export const experimentsConfigPageHandler = async (ctx) => {
  const { experiment } = ctx.var;
  return ctx.render(
    <div>
      <h1>{experiment.name}</h1>
      <h2>{experiment.id}</h2>
      <ul>
        {experiment.variants.map((variant) => (
          <li>
            {variant.id} - {variant.name}: {variant.weight}
          </li>
        ))}
      </ul>
    </div>,
  );
};
