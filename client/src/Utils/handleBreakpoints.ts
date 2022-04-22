export function handleBreakpoints(breakpoints: DOMElement.BreakPoints): string {
  for (const breakpoint of Object.values(breakpoints)) {
    const { active, value: breakPointValue } = breakpoint;
    if (active) {
      return breakPointValue;
    }
  }
  return breakpoints.default.value;
}
