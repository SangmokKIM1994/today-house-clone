module.exports = class Error extends Error{
    constructor({message,code}){super()
    this.message = message
    this.code = code}
}