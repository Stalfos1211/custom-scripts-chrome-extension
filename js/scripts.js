angular.module('customScriptsApp')
.directive('helloWorld', () => {
  return {
    template: "this is the hello world directive"
  }
})
.directive('d2', () => {
  return {
    template: "something else"
  }
})