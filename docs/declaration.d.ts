declare module "abi-decoder" {
  export function addABI(ContractInterface): number
  export function decodeMethod(string): {
    name: string
    params: any[]
  }
}
