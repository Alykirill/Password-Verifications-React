export function checkLength(str: string):boolean {
    return str.length > 6;
}

export function isNumber(str: string):boolean {
    return str.split("").filter(s => /^-{0,1}\d+$/.test(s)).length > 0;
}

export function hasLowercase(str: string):boolean {
    return str.split("").filter(a => /[a-z]/.test(str)).length > 0;
}

export function hasUppercase(str: string):boolean {
   return str.split("").filter(a => /[A-Z]/.test(str)).length > 0;
}