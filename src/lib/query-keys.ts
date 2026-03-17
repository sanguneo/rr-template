export const queryKeys = {
  docs: {
    list: () => ['docs', 'list'] as const,
    count: () => ['docs', 'count'] as const,
  },
  detail: {
    byId: (id?: string | number) => ['detail', id] as const,
  },
};
