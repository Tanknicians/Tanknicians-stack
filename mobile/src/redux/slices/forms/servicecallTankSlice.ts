import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

const initialState = {
  tankId: -1 as number
};

const servicecallTankSlice = createSlice({
  name: 'servicecallClientTank',
  initialState,
  reducers: {
    setTankId: (state, action) => {
      // DB expects a number, not a string
      state.tankId = parseInt(action.payload.tankId);
    },
    clearTankId: (state) => {
      state.tankId = -1;
    }
  }
});

export const { setTankId, clearTankId } = servicecallTankSlice.actions;
export default servicecallTankSlice.reducer;

export const selectCurrentClientTank = (state: RootState) =>
  state.servicecallClientTank.tankId;
