export function DetectedFullYear(dateold: string) {
  let diff = 0;
  let ynew = new Date().getFullYear();
  let mnew = new Date().getMonth();
  let oldDate = new Date(dateold);
  let yold = oldDate.getFullYear();
  let mold = oldDate.getMonth();
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
