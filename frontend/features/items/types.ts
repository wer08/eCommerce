import { TypedUseSelectorHook } from "react-redux"
import { User } from "../auth/types"

export type TItemsState = {
    items: Array<TItem>,
    currentCart: Array<TItem>
    status: string,
    error: string | null | undefined
}

export type TItem = {
    name: string,
    description: string,
    price: number,
    picture: string,
    client: User,
    quantity: number
}

export type TItemUpload = {
    name: string,
    user: User | null,
    description: string,
    price: number,
    picture: Blob | null,
    quantity: number
}
