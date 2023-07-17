export default {
  state: {
    personalAPIKey: 'e01ffe1c66cbb475893aa1494a0e6834',
    currentPage: 1,
    searchQuery: '',
    isLoading: null,
    errorMessage: null,
    isErrorVisible: false,
  },
  mutations: {
    updateQuery (state, payload) {
      state.searchQuery = payload;
    },
    updateCurrentPage (state, payload) {
      state.currentPage = payload;
    },
    updateLoadingState (state, payload) {
      state.isLoading = payload;
    },
    setErrorMessage (state, payload) {
      state.errorMessage = payload;
    },
    setErrorVisibility (state, payload) {
      state.isErrorVisible = payload;
    }
  },
  actions: {},
  getters: {
    getLoadingState (state) {
      return state.isLoading;
    },
    getErrorMessage (state) {
      return state.errorMessage;
    },
    getErrorVisibility (state) {
      return state.isErrorVisible;
    }
  }
}
