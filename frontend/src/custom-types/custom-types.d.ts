declare module '@images/*.jpeg'
declare module '@images/*.png'
declare module '@images/*.jpg'
declare module '@images/*.gif'
declare module '@images/*.webm'

declare type StateSetter<T> = (value: T|((oldValue: T) => T)) => void

declare type Override<T, R> = Omit<T, keyof R> & R