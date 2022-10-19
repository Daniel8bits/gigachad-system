
declare type StateSetter<T> = (value: T|((oldValue: T) => T)) => void

declare type Override<T, R> = Omit<T, keyof R> & R