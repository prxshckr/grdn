export const wait = <Params extends any[], Return>(duration: number, func: (..._: any) => Return) => (...params: Params) => (
  new Promise<Return>((res) => {
    setTimeout(() => res(func(...params)), duration)
  })
)