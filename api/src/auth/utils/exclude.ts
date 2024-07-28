export function exclude<User, Key extends keyof User>(user: User, keys: Key[]): Omit<User, Key> {
  const entries = Object.entries(user).filter(([key]) => !keys.includes(key as Key));
  return Object.fromEntries(entries) as Omit<User, Key>;
}
