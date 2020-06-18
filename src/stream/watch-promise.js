
// How can we make cancellation easier?

//===========
// API Level
//===========
const makeWatch = () => {
    let isCancelled = false;

    const getRandomInt = (max= 5) => {
        const value = Math.floor(Math.random() * Math.floor(max)) + 1;
        return value;
    };

    const watch = (delay= 1000) => new Promise((resolve) => {
        let count = 0;
        const iterate = async () => {
            count +=1;
            console.log(`iterate #${count}`); // How can we get this stream?

            const random = getRandomInt(5);

            if (isCancelled) {
              resolve({status: 'cancelled', value: random});
              return;
            }

            const isMatched = (random === 3);
            if (!isMatched) {
              setTimeout(iterate, delay);
              return;
            }
    
            resolve({status: 'matched', value: random});
          };
          iterate();

    })
    const unwatch = () => {
        isCancelled = true;
    };

    return {
        watch,
        unwatch,
    }
};

//===========
// User Level
//===========
const { watch, unwatch } = makeWatch();

watch().then(({status}) => console.log(status));

setTimeout(() => unwatch(), 10000);
