import axios from "axios";
import { atomWithRefresh, unwrap } from "jotai/utils";
import { apiJotai } from "../utils/api";
import { atom } from "jotai/vanilla";


// GET
export let getUsersAtom = atomWithRefresh(async()=> {
    try {
        let {data} = await axios.get(apiJotai)
        return data
    } catch (error) {
        console.log(error);
    }
})
export let dataJ = unwrap(getUsersAtom, (prev) => prev || '')

export let deleteAtom = atom(null, async(get,set,id) => {
    try {
        await axios.delete(`${apiJotai}/${id}`)
        set(getUsersAtom)
    } catch (error) {
        console.log(error);
    }
})
