export default {
  // 記事のデータをクリア
  CLEAR_POSTDATA(state) {
    state.posts = [];
  },

  // 記事のデータを取得・初回時
  GET_POSTDATA(state, data) {
    state.posts = data;
  },

  // ページ数を1つ増やす
  INCREMENT_PAGE(state) {
    state.count++;
  },

  // ページ数を1つ減らす
  DECREMENT_PAGE(state) {
    state.count--;
  }
};