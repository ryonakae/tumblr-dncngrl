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
  },

  // アイキャッチのVMを取得
  // していろんなとこで使い回す
  SET_EYECATCH(state, vm) {
    state.eyecatch = vm.$els.eyecatch;
  },

  // 記事の画像を取得してurlを取得
  SET_ENTRY_IMAGE(state, url, width, height, offset) {
    state.entryImage.url = url;
    state.entryImage.width = width;
    state.entryImage.height = height;
    state.entryImage.offset = offset;
    console.log(state.entryImage);
  },

  // 記事の画像をクリア
  CLEAR_ENTRY_IMAGE(state) {
    state.entryImage.url = '';
    state.entryImage.width = 0;
    state.entryImage.height = 0;
    state.entryImage.offset = {};
    console.log('cleared state.entryImage');
  },

  // ページのタイトルを変更
  CHANGE_PAGE_TITLE(state, title) {
    state.pageTitle = title;
  }
};