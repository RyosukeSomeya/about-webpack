import $ from 'jquery';
import velocity from 'velocity-animate';
import { add } from './modules/math';
import { greet } from './modules/greet';
import '../scss/style.scss';
import '../scss/test.scss';

console.log('app');

const result = add(1, 2);

$('body')
  .append(result)
  .append(`<p>${greet('App')}</p>`);
velocity($('h1'), 'fadeIn', { duration: 2000, loop: true });

// const a = 1;
// console.log(a);

const z = { z: 3 };

console.log({ x: 1, y: 2, ...z }); // => { x: 1, y: 2, z: 3 }

// poryfill確認用
const promise = new Promise((resolve) => {
  setTimeout(() => resolve('hello'), 3000);
});

async function delayHello() {
  const value = await promise;
  console.log(value);
}

delayHello();
