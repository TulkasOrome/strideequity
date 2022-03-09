const Global = {
  on(event, callback) {
    document.addEventListener(event, (e) => callback(e));
  },
  dispatch(event, data) {
    document.dispatchEvent(new CustomEvent(event, { detail: data }));
  },
  remove(event, callback) {
    document.removeEventListener(event, callback);
  },
  setLoading(flag) {
    Global.blockedLoading = flag;
    Global.dispatch('loading', flag);
  },
  notify(not) {
    console.log('notify',not);
    const notification = { time: new Date(), type: 'info' };
    Global.dispatch('notify', { ...notification, ...not });
  },
  blockedLoading: false,

};

export default Global;
