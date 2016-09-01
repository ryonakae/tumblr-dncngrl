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
    // console.log('pagenum', state.pageNum);
  },

  // ページ数を1つ減らす
  DECREMENT_PAGE_NUM(state) {
    state.pageNum--;
    // console.log('pagenum', state.pageNum);
  },

  // ページ数を0にリセット
  RESET_PAGE_NUM(state) {
    state.pageNum = 0;
    // console.log('pagenum', state.pageNum);
  },

  // 記事数をtotalPostsにセット
  SET_TOTAL_POSTS(state, totalPosts) {
    state.totalPosts = totalPosts;
    // console.log('total_posts', state.totalPosts);
  },

  // 記事数を0にリセット
  RESET_TOTAL_POSTS(state) {
    state.totalPosts = 0;
    // console.log('total_posts', state.totalPosts);
  },

  // アイキャッチのVMを取得
  // していろんなとこで使い回す
  SET_EYECATCH(state, vm) {
    state.eyecatch = vm.$refs.eyecatch;
  },

  // 記事の画像を取得してurlを取得
  SET_ENTRY_IMAGE(state, url, width, height, offset) {
    state.entryImage.url = url;
    state.entryImage.width = width;
    state.entryImage.height = height;
    state.entryImage.offset = offset;
    // console.log(state.entryImage);
  },

  // 記事の画像をクリア
  CLEAR_ENTRY_IMAGE(state) {
    state.entryImage.url = '';
    state.entryImage.width = 0;
    state.entryImage.height = 0;
    state.entryImage.offset = {};
    // console.log('cleared state.entryImage');
  },

  // ページのタイトルを変更
  CHANGE_PAGE_TITLE(state, title) {
    state.pageTitle = title;
  },

  // ノイズのstatusを変更
  CHANGE_GRAIN_STATUS(state, status) {
    state.grainStatus = status;
    // console.log(state.grainStatus);
  }
};