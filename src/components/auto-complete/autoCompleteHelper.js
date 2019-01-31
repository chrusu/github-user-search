export function calculateNextItemId(selected, key, itemCount) {
    let nextItemId = selected;  

    if(key === "ArrowDown")
    {
        nextItemId = nextItemId+1;
    }
    else
    {
        nextItemId = nextItemId-1;
    }

    //check if the new itemId is not out of bounds
    if(nextItemId < itemCount && nextItemId >= 0)
    {
        return nextItemId;
    }
    else 
    {
        return selected
    }
}