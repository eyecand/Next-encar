export function DetectedFullYear(dateold: string) {
  let diff = 0;
  const ynew = new Date().getFullYear();
  const mnew = new Date().getMonth();
  const oldDate = new Date(dateold);
  const yold = oldDate.getFullYear();
  const mold = oldDate.getMonth();
  diff = ynew - yold;
  if (diff < 3) {
    return diff;
  } else if (diff === 3) {
    if (mnew <= mold) {
      return diff;
    } else {
      diff = diff - 1;
      return diff;
    }
  } else if (diff === 5) {
    if (mnew > mold) {
      diff = diff + 1;
      return diff;
    } else {
      return diff;
    }
  }

  return diff;
}
