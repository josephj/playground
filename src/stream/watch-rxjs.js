import { Observable } from 'rxjs';

//===========
// API Level
//===========
const getStatusCode = (max = 5) => {
  const value = Math.floor(Math.random() * Math.floor(max)) + 1;
  return value;
};

const watch = Observable.create(observer => {
  const iterate = () => {
    const code = getStatusCode(5);
    observer.next({ status: 'not-matched', code }); // SOLVED
    const isMatched = code === 3;
    if (!isMatched) {
      setTimeout(iterate, 3000);
      return;
    }

    observer.next({ status: 'matched', code });
    observer.complete();
  };
  iterate();
});

//===========
// User Level
//===========
const subscribe = watch.subscribe(val => console.log(val));
setTimeout(() => {
  console.log('unsubscribed');
  if (!subscribe.isStopped) {
    subscribe.unsubscribe();
  }
}, 10000);
