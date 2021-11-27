export enum Status {
  CANCELLED = "cancelled",
  COMPLETED = "completed",
  CONFIRMED = "confirmed",
  UNCONFIRMED = "unconfirmed",
}

export function possibleTransitions(from: Status, changeTo: Status): boolean {
  if (from === Status.CANCELLED) return false;
  if (from === Status.UNCONFIRMED && changeTo !== Status.COMPLETED) return true;
  if (from === Status.COMPLETED) return false;
  if (
    from === Status.CONFIRMED &&
    (changeTo === Status.CANCELLED || changeTo === Status.COMPLETED)
  )
    return true;
  return false;
}
