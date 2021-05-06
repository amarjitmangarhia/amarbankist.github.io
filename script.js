'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const account5 = {
  owner: 'Devanshu Sharma',
  movements: [800, 100, 1200, 70, 30, 45, 90],
  interestRate: 1,
  pin: 5555,
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  // .textContent = 0;

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov}€</div>
  </div>
`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (movements) {
  const balance = movements.reduce(function (acc, mov) {
    return acc + mov;
  });
  labelBalance.textContent = `${balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const createUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(function (name) {
        return name[0];
      })
      .join('');
  });
};

createUserName(accounts);

//event listener
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  //prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //display UI and welcome msg
    labelWelcome.textContent = `Welcome Back ${
      currentAccount.owner.split(' ')[0]
    }`;

    containerApp.style.opacity = 100;
    //clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    //display movemnets
    displayMovements(currentAccount.movements);
    //display balance
    calcDisplayBalance(currentAccount.movements);
    //display summary
    calcDisplaySummary(currentAccount);
  }
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
//MORE ARRAY METHODS
/*
let arr = ['a', 'b', 'c', 'd', 'e'];

//ARRAY SLICE MATHOD
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));
console.log(arr.slice());
console.log([...arr]);

//ARRAY SPLICE MATHOD and mutated the original array
// console.log(arr.splice(2));
arr.splice(-1);
console.log(arr);
arr.splice(1, 2);
console.log(arr);

//REVERSE and mutated the original array
arr = ['a', 'b', 'c', 'd', 'e'];

const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

//CONACT

const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, arr2]); //works same as above using spread operator

//JOIN
console.log(letters.join(' - '));
*/
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1} You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1} You withdraw ${Math.abs(movement)}`);
  }
}

//OR

console.log('//////////////////FOR EACH/////////////////////////');

movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1} You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1} You withdraw ${Math.abs(mov)}`);
  }
});

// 0: FUNCTION(200)
// 1: FUNCTION(450)
// 2: FUNCTION(400)

//My own experiments
const arrayOfNames = ['Amarit', 'Laddi', 'Aman', 'Ravi'];

console.log('//using for of loop//////////////////////');

for (const [i, names] of arrayOfNames.entries()) {
  //i is for index and must to use entries() to get index
  console.log(`${names} is on ${i + 1} index`);
}
console.log('//using forEach loop//////////////////////');

arrayOfNames.forEach(function (el, i) {
  //i is for index
  console.log(`${el} is on ${i + 1} index`);
});

*/
/*
//For each loop with maps and sets
//with map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});
//with sets

const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);

currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`); //because it do not have index and keys
});
*/
/*
//coding challenge
const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice();
  dogsJuliaCorrected.splice(0, 1);
  dogsJuliaCorrected.splice(-2);
  // console.log(dogsJulia.slice(1, 3));
  const dogs = dogsJuliaCorrected.concat(dogsKate);
  // console.log(dogs);
  // for (let [i, dog] of dogs.entries()) {
  //   dog = dog[i] >= 3 ? 'Adult' : 'Puppy';
  //   let stringDogs = `Dog Number ${i + 1} is an ${dog[i]}, and is ${
  //     dog[i]
  //   } years old`;
  //   console.log(stringDogs);
  // }

  dogs.forEach(function (dog, i) {
    if (dog >= 3) {
      console.log(`Dog Number ${i + 1} is an adult, and is ${dog} years old`);
    } else {
      console.log(`Dog ${i + 1} is still a puppy`);
    }
  });
};

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 8, 6, 3], [10, 5, 6, 1, 4]);
*/
// const shallowCopyOfJuliaDogs = [...dogsJulia];
// console.log(shallowCopyOfJuliaDogs);
// const newArrayOfJuliaDogs = shallowCopyOfJuliaDogs.slice(1, -2);
// const newArrayOfKateDogs = [...dogsKate];
// console.log(newArrayOfJuliaDogs);
// console.log(newArrayOfKateDogs);

//MAP METHOD
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const eruoToUsd = 1.1;

const movementsUsd = movements.map(function (mov) {
  return mov * eruoToUsd;
});

console.log(movements);
console.log(movementsUsd);
//map is better.... modern way
//OR

const movementUsdFor = [];
for (const mov of movements) {
  movementUsdFor.push(mov * eruoToUsd);
}

console.log(movementUsdFor);

console.log(`/////////using arrow function/////////`);

const movementsUsdUsingArrowFunction = movements.map(mov => mov * eruoToUsd);
console.log(movementsUsdUsingArrowFunction);

//shortest code
const movementsDescription = movements.map(
  (mov, i) =>
    `Movement ${i + 1} You ${mov > 0 ? 'Deposited' : 'Withdraw'} ${Math.abs(
      mov
    )}`
);

console.log(movementsDescription);

*/

//Filter method
/*
const deposit = movements.filter(function (mov, i, full) {
  return mov > 0;
});

console.log(deposit);

//regular for loop
const depositsFor = [0];
for (const mov of movements) {
  if (mov > 0) depositsFor.push(mov);
}

console.log(depositsFor);

//using arrow function
const withdrawal = movements.filter(mov => mov < 0);

console.log(withdrawal);
*/
//Filter method ends

//reduce method
// console.log(movements);

// accumalator is like a snow ball
// const balance = movements.reduce(function (accumalator, curr, i, arr) {
//   console.log(`Iteartion number ${i}: ${accumalator}`);
//   return accumalator + curr;
// }, 0);

/*
//using arrow function
const balance = movements.reduce((accumalator, curr) => accumalator + curr, 0);

console.log(balance);

//using for loop
let balance2 = 0;
for (const mov of movements) {
  balance2 = balance2 + mov;
}

console.log(balance2);

//Maximum value of the movements

const max = movements.reduce(function (acc, mov) {
  if (acc > mov) {
    return acc;
  } else {
    return mov;
  }
}, movements[0]);

console.log(max);
*/

//#2 coding challenge
/*
//map filter reduce

// const checkDogs = function (dogsJulia, dogsKate) {
//   const dogsJuliaCorrected = dogsJulia.slice();
//   dogsJuliaCorrected.splice(0, 1);
//   dogsJuliaCorrected.splice(-2);
//   const dogs = dogsJuliaCorrected.concat(dogsKate);

//   dogs.forEach(function (dog, i) {
//     if (dog >= 3) {
//       console.log(`Dog Number ${i + 1} is an adult, and is ${dog} years old`);
//     } else {
//       console.log(`Dog ${i + 1} is still a puppy`);
//     }
//   });
// };

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// checkDogs([9, 16, 8, 6, 3], [10, 5, 6, 1, 4]);

// let humanAge = [];
// let x = [];

console.log('////////////////////////////////');
const calcAverageHumanAge2 = function (ages) {
  const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));

  const adultDogs = humanAges.filter(age => age >= 18);

  const average =
    adultDogs.reduce((acc, age) => acc + age, 0) / adultDogs.length;

  return average;
};

const avg1 = calcAverageHumanAge2([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge2([16, 6, 10, 5, 6, 1, 4]);

console.log(avg1);
console.log(avg2);
*/

/*
//magic of chaining the method
const eruoToUsd = 1.1;
//PIPELINE
const totalDepositsInUsd = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eruoToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsInUsd);
*/

//coding challenge #3

// const calcAverageHumanAge = function (ages) {
//   const humanAge = ages.map(function (age) {
//     if (age <= 2) {
//       return 2 * age;
//     } else if (age > 2) {
//       return 16 + age * 4;
//     }
//   });
//   const filter = humanAge.filter(mov => mov > 18);
//   const reduce = filter.reduce((acc, curr) => acc + curr, 0) / filter.length;
//   console.log(reduce);
// };

// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
/*
//same challange with arrow function
const calcAverageHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(mov => mov > 18)
    .reduce((acc, curr, i, arr) => acc + curr / arr.length, 0);

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
*/

//Find method
/*
const firstWithdrawal = movements.find(mov => mov < 0);

console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

//challenge

for (const account of accounts) {
  if (account.owner === 'Jessica Davis') {
    console.log(account);
  }
}
*/
