export function convertJoinDate(date: Date): string {
  const joinDate = new Date(date);
  const month = joinDate.toLocaleString('default', { month: 'long' });
  const year = joinDate.getFullYear();

  return `${month} ${year}`;
}
