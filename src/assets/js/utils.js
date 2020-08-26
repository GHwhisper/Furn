function deepClone(obj) {    // 对象深度拷贝
    let _obj = JSON.stringify(obj),
        objClone = JSON.parse(_obj)
    return objClone
}

function hideEmailInfo(email) {     // 隐藏邮箱部分字符
    if(String(email).indexOf('@') > 0) {
        let newEmail,
            str = email.split('@'),
            _s = ''
        if(str[0].length > 4) {
            _s = str[0].substr(0, 3)
            let m = str[0].length - 3
            for(let i = 0; i < m; i++) {
                _s += '*'
            }
        } else {
            _s = str[0].substr(0, 1)
            let m = str[0].length -1
            for(let i = 0; i < m; i++) {
                _s += '*'
            }
        }
        newEmail = _s + '@' + str[1]
        return newEmail
    } else {
        return email
    }
}

function hidePhone(phone) {
    if (Number(phone) && String(phone).length === 11) {
        var mobile = String(phone)
        var reg = /^(\d{3})\d{4}(\d{4})$/
        return mobile.replace(reg, '$1****$2')
    } else {
        return phone
    }
}

export {
    deepClone,
    hideEmailInfo,
    hidePhone,
}