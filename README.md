# State Management in Angular - Todo App

POC das diferentes maneiras que podemos trabalhar com gerenciamento de estado em aplicações Angular.

A branch master apresenta o app básico - uma lista de todos que inicia com apenas um objeto para mostrar em tela. Há um serviço que implementa a lógica de persistência dos dos dados no local storage, porém não há ligação entre este serviço e o componente. 

## NgRx Store

Na branch ngrx-store foi implementado a chamada store global, que consiste de um AppState cujo único estado é o TodoState. 

Este approach utiliza todo o poder do NgRx para controle total sobre o estado da aplicação, separando as responsabilidades em actions, reducers, selectors e effects.

## NgRx Component Store

Na branch ngrx-component-store está a implementação da Component Store - que consiste em um único arquivo TS que executa as todas as mudanças de estado da aplicação.

## Signals

Já na Branch signals temos uma implementação da nova maneira de gerenciar estado, lançada no Angular 16 - um jeito muito simples de tratar com um problema antigo.

Extraí a lógica do signal para um serviço, a fim de demonstrar como esta nova feature pode tomar o lugar de um gerenciamento de estado via store.

## How to Run
1 - Clone o repositório
```
git clone https://github.com/brunodefreitasborges/todo-angular-state-management.git
```

2 - Dentro da pasta, instale as dependências

```
npm install
```

3 - Sirva a applicação utilizando o Angular CLI

```
ng serve
```

