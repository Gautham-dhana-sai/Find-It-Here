export function getSSToken () {
    const token = sessionStorage.getItem('token')
    return token
}

export function getSSEmail () {
    const email = sessionStorage.getItem('email')
    return email
}

export function getSSUserId () {
    const userId = sessionStorage.getItem('userId')
    return userId
}

export function getSSUID () {
    const userId = sessionStorage.getItem('UID')
    return userId
}

export function setSSToken (value) {
    const token = sessionStorage.setItem('token', value)
    return token
}

export function setSSEmail (value) {
    const email = sessionStorage.setItem('email', value)
    return email
}

export function setSSUserId (value) {
    const userId = sessionStorage.setItem('userId', value)
    return userId
}

export function setSSUID (value) {
    console.log(value)
    const userId = sessionStorage.setItem('UID', value)
    return userId
}