const isValid = (name)=>{
    if(!name) return false
    if(typeof name !== "string" || name.trim() == 0) return false
    return true
}

const isValidChar = (name)=>{
    return /^[a-z0-9]{2,100}$/i.test(name) 
}

const isValidMobileNo = (phone)=>{
    return (/^([0|\+[0-9]{1,5})?([6-9][0-9]{9})$/).test(phone);
}

const isValidEmail = (email)=>{
    return (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/).test(email);

}

module.exports = {isValid , isValidChar , isValidMobileNo , isValidEmail} 