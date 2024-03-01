/// <reference types="@workadventure/iframe-api-typings" />

const arrayFillingCoroutine = function * (possibleArrays: Array<Array<string>>, callbackWhenWrong: Function, callbackWhenResolved: Function): Generator<void> {
  let hasBeenResolved = false
  let currentArray: Array<string> = []
  while (!hasBeenResolved) {
    let item = yield

    let canContinue = false
    currentArray.push(item as unknown as string)
    for (let i = 0; i < possibleArrays.length; i++) {
      let isTheSame = true
      for (let j = 0; j < currentArray.length; j++) {
        if (possibleArrays[i][j] === currentArray[j]) {
          // Si c'est la même chose, alors on continue
          if (j === possibleArrays[i].length - 1) {
            hasBeenResolved = true
            callbackWhenResolved()
          }
          continue
        }

        isTheSame = false
        break;
      }

      if (isTheSame) {
        canContinue = true;
        break;
      }
    }

    if (!canContinue) {
      currentArray = []
      callbackWhenWrong()
    }
  }
}

const setArrayFilling = (id: string, validArrays: Array<Array<string>>, whenWrong: Function, whenResolved: Function) => {
  // @ts-ignore
  window[`arrayFilling${id}`] = arrayFillingCoroutine(validArrays, whenWrong, whenResolved)
  // @ts-ignore
  window[`arrayFilling${id}`].next()
}

const testArrayFilling = (id: string, value: string) => {
  // @ts-ignore
  window[`arrayFilling${id}`].next(value)
}

export {
  setArrayFilling,
  testArrayFilling
}