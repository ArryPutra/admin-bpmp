export function getRowNumber(
    index: number,
    currentPage: number = 1,
) {
    return index + 1 + (currentPage - 1) * 10
}
