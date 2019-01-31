import { calculateNextItemId } from './autoCompleteHelper';

it('calculateNextItemId - arrowUp - position 0', () => {
    const nextItemId = calculateNextItemId(0, "ArrowUp", 3);
    expect(nextItemId).toBe(0);
  });
  

  it('calculateNextItemId - arrowUp - position 2', () => {
    const nextItemId = calculateNextItemId(2, "ArrowUp", 3);
    expect(nextItemId).toBe(1);
  });

  it('calculateNextItemId - arrowDown - position 2', () => {
    const nextItemId = calculateNextItemId(2, "ArrowDown", 3);
    expect(nextItemId).toBe(2);
  });

  it('calculateNextItemId - arrowDown - position 1', () => {
    const nextItemId = calculateNextItemId(1, "ArrowDown", 3);
    expect(nextItemId).toBe(2);
  });