export const updateObjects = (oldObject, updatedValues) => {
  return {
    ...oldObject,
    ...updatedValues
  }
}