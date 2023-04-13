export type TItemsState = {
    items: Array<TItem>,
    currentCart: Array<TItem>
    status: string,
    error: string | null | undefined
}

export type TItem = {
    name: string,
    description: string,
    price: number 
}
