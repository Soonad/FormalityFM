Formality.fm
============

Formality is now implemented in itself!


Installing
----------

Formality is usually installed using `npm`:

```bash
# installs fmjs
npm i -g formality-js
```

You can also install it using `cabal`: 

```bash
TODO: install instructions
```

Using
-----

Type `fmjs file.fm` to check a file, and `fmjs name --run` to run a program.

### Standard Library

Since Formality still doesn't have a module system, you need to be in the
`FormalityFM/lib` directory to enable the standard library, which includes things
like numbers, strings, lists and so on:

```
git clone https://github.com/moonad/formalityfm
cd formalityfm/lib
```

When inside `FormalityFM/lib`, type `fmjs Main.fm` to check the definitions
inside `Main.fm`, and `fmjs Main.greet --run` to run the `Main.greet` program.
Then you can add your own file and play with it.

Documentation
-------------

... TODO ...

Examples
--------

### Hello, World

```c
// Formality's "Hello, World" as a String
hello_world: String
  "Hello, world!"
```

### Simple types and functions

- A type for cards

    ```c
    // The suit of a card
    type Suit {
      diamonds
      clubs
      hearts
      spades
    }

    // Stringifies a suit
    suit_to_string(suit: Suit): String
      case suit {
        diamonds: "diamonds"
        clubs: "clubs"
        hearts: "hearts"
        spades: "spades"
      }
    ```

- Nats (positive integers) and recursive functions


    ```c
    // A natural number is either zero or the successor of a natural number
    type Nat {
      zero
      succ(pred: Nat)
    }

    // Doubles a natural number
    double(n: Nat): Nat
      case n {
        zero: 0
        succ: Nat.succ(Nat.succ(double(n.pred)))
      }
    ```

### Monads

- A recursive side-effective process:

    ```c
    // A program that asks the user's name forever
    greet: IO(Unit)
      do IO {
        IO.print("What is your name?")
        var name = IO.get_line
        IO.print("Hello, " | name | "!")
        greet
      }
    ```

### Simple proofs

- An inductive proof that `n+0 == n`:

    ```c
    my_proof(n: Nat): Nat.add(n,0) == n
      case n {
        zero: refl
        succ: apply(Nat.succ, my_proof(n.pred))
      }!
    ```

- Using subset types (sigma) to formalize the concept of "being even":
  
    ```c
    // An even number is a positive integer such that Nat.is_even(x) is true
    IsEven(n: Nat): Type
      {x: Nat} Nat.is_even(x) == true

    // Proof that two is even
    two_is_even: IsEven(2)
      2 ~ refl
    ```

- Using indexed datatype to formalize the concept of "being even":

    ```c
    // Zero is even. For any even n, 2+n is even.
    type IsEven ~ (n: Nat) {
      zero                       ~ (n: 0)
      succ(n: Nat, e: IsEven(n)) ~ (n: Nat.add(2,n))
    }

    // Proof that 2 is even
    two_is_even: IsEven(2)
      IsEven.succ(_,IsEven.zero)
    ```
