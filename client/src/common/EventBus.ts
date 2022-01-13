const eventBus = {
  on(event: string, callback: EventListener) {
    document.addEventListener(event, (e) => callback(e));
  },
  remove(event: string, callback: EventListener) {
    document.removeEventListener(event, callback);
  },
};

export default eventBus;
