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
  INCREMENT_PAGE_NUM(state) {
    state.pageNum++;
  },

  // ページ数を1つ減らす
  DECREMENT_PAGE_NUM(state) {
    state.pageNum--;
  },

  // ページ数を0にリセット
  RESET_PAGE_NUM(state) {
    state.pageNum = 0;
  },

  // 記事数をtotalPostsにセット
  SET_TOTAL_POSTS(state, totalPosts) {
    state.totalPosts = totalPosts;
  },

  // 記事数を0にリセット
  RESET_TOTAL_POSTS(state) {
    state.totalPosts = 0;
  },

  // アイキャッチのVMを取得していろんなとこで使い回す
  SET_EYECATCH(state, vm) {
    state.eyecatch = vm.$els.eyecatch;
  },

  // アイキャッチ画像をセット
  SET_EYECATCH_IMAGE(state, dom) {
    state.eyecatchImage = dom;
  },

  // 記事の画像を取得してurlを取得
  SET_ENTRY_IMAGE(state, url, width, height, offset) {
    state.entryImage.url = url;
    state.entryImage.width = width;
    state.entryImage.height = height;
    state.entryImage.offset = offset;
  },

  // 記事の画像をクリア
  CLEAR_ENTRY_IMAGE(state) {
    state.entryImage.url = '';
    state.entryImage.width = 0;
    state.entryImage.height = 0;
    state.entryImage.offset = {};
  },

  // ページのタイトルを変更
  CHANGE_PAGE_TITLE(state, title) {
    state.pageTitle = title;
  },
};