<img width="130"src="https://raw.githubusercontent.com/tormjs/torm.js/master/docs/torm.png">

<a href="https://circleci.com/gh/tormjs/torm.js/tree/master"><img src="https://img.shields.io/circleci/project/tormjs/torm.js/master.svg" alt="Build Status"></a>

# Torm
Torm is a decorator-based ORM for Typescript with a set of fluent API, it's built on Sequelize.

## Installation

The project is currently under active development. But you can try to install it through NPM:

```
npm i -S torm.js
```

And then, we should enable some config in ```tsconfig.json``` file.

```
"compilerOptions": {
  // ..... other configuration
  // add following two lines.
  
  "experimentalDecorators": true,
  "emitDecoratorMetadata": true
}
```

Finally, import ```reflect-metadata``` module in the entrance of your app:

```
import 'reflect-metadata';

// your code...
```

It works! You can import torm and getting your work done!

Btw, if you want to use ```async/await``` in your code, you should tweak option ```target``` as below:

```
"compilerOptions": {
  "target": "es2015",
}
```

## Document
Documents are still under construction, it'll come out soon. So for now, please refer to **Examples** below for basic usage. 

## Examples

### Connection

```typescript
Torm.connect('orm', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});
```

### Model definition

```typescript
@Entity
class Person extends Model {

    @Column()
    name: string;

    @Column()
    age: number;

    @Column()
    friends: string

}
```

### Model creation

```typescript
let person = new Person();
person.name = 'Eric';
person.age = 1;
person.friends = 'Vincent';
Torm.create(person);
```

### Query API

```typescript
let persons = await Torm.query(Person)
    .where(col('id').eq(1))
    .findAll();

persons.forEach(p => console.log(p.name))

let count = await Torm.query(Person).count();
console.log(count);

let all = await Torm.query(Person).limit(2).offset(1).findAll();
all.forEach(a => console.log(a.id));
```

### Fluent Query API

```typescript
const cond = col('age').lt(20);    // age < 20
const cond = col('age').lt(30).or().gt(20);    // age > 20 or age < 30
const cond = col('age').lt(30).and().gt(20);     // age > 20 and age < 30

const cond = col('id').between(20, 30);

// and more APIs...

```

We could integrate query API with fluent API.

```typescript

let rst = await Torm.query(Person)
    .where( col('age').lt(30).and().gt(20) )
    .findAll();

```

## License

[MIT](http://opensource.org/licenses/MIT)
