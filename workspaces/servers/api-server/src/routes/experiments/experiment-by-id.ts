export const experimentByIdHandler = async (c) => {
  const { experiment } = c;
  return c.json(experiment);
};
