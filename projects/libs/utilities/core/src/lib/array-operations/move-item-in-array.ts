/**
 * move item in array from previousIndex to currentIndex
 * @param array
 * @param fromIndex
 * @param toIndex
 * @returns array
 */
export const moveItemInArray = <T>(array: T[], fromIndex: number, toIndex: number): T[] => {
  if (fromIndex === toIndex) {
    return array;
  }

  const arrayWithoutItemToMove = array.filter((_, index) => index !== fromIndex);

  return [...arrayWithoutItemToMove.slice(0, toIndex), array[fromIndex], ...arrayWithoutItemToMove.slice(toIndex)];
};
