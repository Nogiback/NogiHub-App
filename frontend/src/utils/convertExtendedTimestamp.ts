export function convertExtendedTimestamp(date: Date): string {
  const postDate = new Date(date);

  const hour: number = postDate.getHours();
  const minute: number = postDate.getMinutes();
  const amPM: string = hour >= 12 ? 'PM' : 'AM';
  const formattedHour: number = hour % 12 || 12; // Convert 0 to 12
  const formattedMinute: string = minute < 10 ? `0${minute}` : `${minute}`;
  const month: string = postDate.toLocaleString('en-US', { month: 'long' });
  const day: number = postDate.getDate();
  const year: number = postDate.getFullYear();

  const longTimestamp: string = `${formattedHour}:${formattedMinute} ${amPM} · ${month} ${day}, ${year}`;

  return longTimestamp;
}
