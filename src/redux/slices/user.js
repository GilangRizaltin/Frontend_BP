import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, logoutUser, registerUser } from "../../utils/https/auth";

const initialState = {
    isUserAvailable: false,
    userInfo: null,
    err: {
        login: null,
        register: null,
        logout:null,
    },
    isPending: false,
    isRejected: false,
    isFulfilled: false,
}

const loginThunk = createAsyncThunk("auth/login", async({body, cb, errorCb}, { rejectWithValue }) => {
    try {
          const {data} = await loginUser(body);
          if (cb) cb()
          return data.data
      } catch (err) {
          const errObj = {
              status: err.response.status,
              message: err.response.data.message,
          }
          console.log(err)
          errorCb(err);
          return rejectWithValue(errObj)
      }
});

const logoutThunk = createAsyncThunk("auth/logout", async({token, cb}, { rejectWithValue }) => {
    try {
          const {data} = await logoutUser(token);
          if (cb) cb()
          return data.data
      } catch (err) {
          const errObj = {
              status: err.response.status,
              message: err.response.data.message,
          }
          console.log(err)
          return rejectWithValue(errObj)
      }
});
  
  
const registerThunk = createAsyncThunk("auth/register", async (body, { rejectWithValue }) => {
      try {
        const { data } = await registerUser(body);
        return data.data;
      } catch (err) {
        const errObj = {
          status: err.response.status,
          message: err.response.data.msg,
        };
        return rejectWithValue(errObj);
      }
});

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginThunk.pending, (prevState) => {
            return {
                ...prevState,
                isPending: true,
                isRejected: false,
                isFulfilled: false,
                err: null,
            }
        })
        .addCase(loginThunk.rejected, (prevState, {payload}) => {
            return {
                ...prevState,
                isPending: false,
                isRejected: true,
                err: {
                    ...prevState.err,
                    login: payload,
                }
            }
        })
        .addCase(loginThunk.fulfilled, (prevState, {payload}) => {
            return {
                ...prevState,
                isUserAvailable: true,
                isPending: false,
                isFulfilled: true,
                userInfo: payload,
            }
        })
        .addCase(logoutThunk.pending, (prevState) => {
          return {
              ...prevState,
              isPending: true,
              isRejected: false,
              isFulfilled: false,
              err: null,
          }
      })
      .addCase(logoutThunk.rejected, (prevState, {payload}) => {
          return {
              ...prevState,
              isPending: false,
              isRejected: true,
              err: {
                  ...prevState.err,
                  logout: payload,
              }
          }
      })
      .addCase(logoutThunk.fulfilled, (prevState, {payload}) => {
          return {
              ...prevState,
              isUserAvailable: false,
              isPending: false,
              isFulfilled: true,
              token:null,
              userInfo: null,
          }
      })
        .addCase(registerThunk.pending, (prevState) => {
            return {
              ...prevState,
              isPending: true,
              isRejected: false,
              isFulfilled: false,
              err: {
                ...prevState.err,
                register: null,
              },
            };
          })
          .addCase(registerThunk.rejected, (prevState, { payload }) => {
            return {
              ...prevState,
              isPending: false,
              isRejected: true,
              err: {
                ...prevState.err,
                register: payload,
              },
            };
          })
          .addCase(registerThunk.fulfilled, (prevState, { payload }) => {
            return {
              ...prevState,
              isPending: false,
              isFulfilled: true,
              userInfo: payload,
            };
          });
    }
});


export const userAction = {
    ...userSlice.actions,
    loginThunk,
    logoutThunk,
    registerThunk,
}

export default userSlice.reducer