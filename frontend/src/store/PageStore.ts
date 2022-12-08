import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import queryToString from '@utils/algorithms/queryToString'

interface PageStoreState {
  location: string,
  params: SerializableMap<string, unknown>,
  query: SerializableMap<string, string>
}

const initialState: PageStoreState = {
  location: window.location.hostname,
  params: [],
  query: [],
}

const PageStore = createSlice({
  name: 'page',
  initialState,
  reducers: {
    set: (state: PageStoreState, action: PayloadAction<PageStoreState>) => {
      state.location = action.payload.location
      state.params = action.payload.params
      state.query = action.payload.query
      const [, valuePath] = queryToString(action.payload.query)
      window.location.href = `${action.payload.location}${valuePath}`
    }
  }
})

export const { set } = PageStore.actions
export default PageStore.reducer