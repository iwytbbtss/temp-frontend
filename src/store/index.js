import Vue from "vue";
import Vuex from "vuex";
import data from "../dummy.json";
import data2 from "../datesdummy.json";
import coord from "../coordinate.json";
import "@/datasources/firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import router from "@/router";
const auth = getAuth();

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    places: data,
    scds: data2,
    locations: coord,
    liked: [],
    showModal: false,
    showSideMenu: false,
    user: null,
  },
  getters: {
    getPlaces(state) {
      return state.places;
    },
    getLikedPlaces(state) {
      const result = state.places.filter((item) =>
        state.liked.some((el) => item.id == el.id)
      );
      return result;
    },
    getLiked(state) {
      return state.liked;
    },
    getShowModal(state) {
      return state.showModal;
    },
    getLocations(state) {
      return state.locations;
    },
    getShowSideMenu(state) {
      return state.showSideMenu;
    },
  },
  mutations: {
    addLikePlace(state, payload) {
      state.liked.push(payload);
    },
    deleteLikePlace(state, id) {
      const i = state.liked.findIndex((item) => item.id == id);
      state.liked.splice(i, 1);
    },
    setShowModal(state, bool) {
      state.showModal = bool;
    },
    setShowSideMenu(state, bool) {
      state.showSideMenu = bool;
    },
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    emailLogin({ commit }, payload) {
      signInWithEmailAndPassword(auth, payload.userid, payload.userpw)
        .then((userinfo) => {
          commit("setUser", {
            id: userinfo.user.uid,
            name: userinfo.user.displayname,
          });
          router.push("/");
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    googleLogin({ commit }) {
      const oProvider = new GoogleAuthProvider();
      oProvider.addScope("profile");
      oProvider.addScope("email");
      signInWithPopup(auth, oProvider)
        .then((userinfo) => {
          commit("setUser", {
            id: userinfo.user.uid,
            name: userinfo.user.displayname,
          });
          router.push("/");
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    registerUser({ commit }, payload) {
      createUserWithEmailAndPassword(auth, payload.userid, payload.userpw)
        .then((userinfo) => {
          commit("setUser", {
            id: userinfo.user.uid,
            name: userinfo.user.displayname,
          });
          router.push("/");
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
  },
  modules: {},
});
