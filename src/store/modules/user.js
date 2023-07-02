import getUserTempId from "@/utils/userTempId";
import { reqLogin, reqUserInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/token";
const state = {
  userTempId: getUserTempId(),
  token: getToken(),
  userInfo: {},
};
const mutations = {
  set_token(state, payload) {
    state.token = payload.token;
    setToken(payload.token);
  },

  set_userInfo(state, payload) {
    state.userInfo = payload;
  },

  clear_Token(state) {
    state.token = "";
    state.userInfo = {};
    removeToken();
  },
};
const actions = {
  async getToken({ commit }, payload) {
    const result = await reqLogin(payload);
    commit("set_token", result);
  },

  async getUserInfo({ commit }) {
    const result = await reqUserInfo();
    commit("set_userInfo", result);
  },
};
const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true,
};
