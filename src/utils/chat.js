export const getChatId = (from, to) => {
  return from > to ? from + ',' + to : to + ',' + from;
}