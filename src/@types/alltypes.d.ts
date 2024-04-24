declare const DEV: boolean
declare const If: React.FC<{ condition: boolean }>
declare const Choose: React.FC
declare const When: React.FC<{ condition: boolean }>
declare const Otherwise: React.FC

declare interface Reflectable {
  __reflectable?: unknown
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare function getReflectedType<T extends Reflectable>(): any