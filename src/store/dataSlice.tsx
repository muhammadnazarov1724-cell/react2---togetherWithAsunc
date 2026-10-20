import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { initialstate } from "../components/types";
import axios from 'axios'
import { apiRedux } from "../utils/api";

export let getUsersRedux = createAsyncThunk('data/getUsersRedux', async()=> {
    try {
        let {data} = await axios.get(apiRedux)
        return data
    } catch (error) {
        console.log(error);
    }
})

export let deleteRedux = createAsyncThunk('data/deleteRedux', async(id, {dispatch}) => {
    try {
        await axios.delete(`${apiRedux}/${id}`)
        dispatch(getUsersRedux())
    } catch (error) {
        console.log(error);
    }
})

let initialState: initialstate = {
    dataR: [],
    loading: false,
    error: []
}

export let dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUsersRedux.pending, (state) => {
            state.loading = true
        })
        .addCase(getUsersRedux.fulfilled, (state,{payload}) => {
            state.dataR = payload,
            state.loading = false
        })
        .addCase(getUsersRedux.rejected, (state,{payload}) => {
            state.error = payload
        })
    }
}) 

export default dataSlice.reducer