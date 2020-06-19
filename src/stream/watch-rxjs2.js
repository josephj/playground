import { timer } from 'rxjs';
import  { map } from 'rxjs/operators';

const getStatus = (max = 5) => {
    const value = Math.floor(Math.random() * Math.floor(max)) + 1;
    return value;
};

//===========
// API Level
//===========
const watch$ = timer(0, 3000)
    .pipe(
        map(() => getStatus()),
    );

//===========
// User Level
//===========
const subscription = watch$.subscribe(value => {
    if (value === 3) {
        console.log({status: 'matched', value});
        subscription.unsubscribe(); // can use it forever
    }
    console.log({status: 'keep', value});
});

setTimeout(() => {
    console.log({status: 'cancelled'})
    subscription.unsubscribe()
}, 10000);

