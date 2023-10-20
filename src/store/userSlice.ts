import { User } from "@/models/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  user: User|null;
}

const initialState: UserState = {
  user: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {setUser: (state, action: PayloadAction<any>) => {state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
