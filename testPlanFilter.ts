export const testPlanFilter = () => {
  const filters: RegExp[] = []

  filters.push(/@no-parallel/)

  return filters.length ? filters : undefined
}
