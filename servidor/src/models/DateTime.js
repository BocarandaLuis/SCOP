export const dateTime = (type) => {
    const d = new Date(),
    year = d.getFullYear(),
    month = parseInt(d.getMonth()) + 1,
    day = d.getDate(),
    hour = d.getHours(),
    minute = d.getMinutes(), 
    second = d.getSeconds(); 

    if(type == "hour") return `${hour}:${minute}:${second}`
    if(type == "date") return `${year}/${month}/${day}`

    return `${year}/${month}/${day} ${hour}:${minute}:${second}`
}

export const orderDate = (fulldate) =>{
    console.log(`${fulldate}`)
    // console.log("oredeDate", fulldate)
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let arrayDate = `${fulldate}`.split(' ')
    let setDate
    month.forEach((element, index) => {
        // console.log("index: ", index)
        // console.log("mes del array: ", element)
        // console.log("mes de la variable ", arrayDate[1])
        // console.log(`${arrayDate[1]}` == `${element}`)
        if(`${arrayDate[1]}` == `${element}`){
             setDate = `${arrayDate[2]}/${index+1}/${arrayDate[3]}`
            return 
        }
    });
    return setDate
}

export const orderDate2 = (fulldate) =>{
    // console.log("oredeDate", fulldate)
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let arrayDate = `${fulldate}`.split(' ')
    let setDate
    month.forEach((element, index) => {
        // console.log("index: ", index)
        // console.log("mes del array: ", element)
        // console.log("mes de la variable ", arrayDate[1])
        // console.log(`${arrayDate[1]}` == `${element}`)
        if(`${arrayDate[1]}` == `${element}`){
            let mes
            if(index+1 > 9) {
                setDate = `${arrayDate[3]}-${index+1}-${arrayDate[2]}`
                return 
            }
            setDate = `${arrayDate[3]}-0${index+1}-${arrayDate[2]}`
            return
        }
    });
    return setDate
}

export const orderDatePayment = (fulldate) =>{
  console.log("oredeDate", `${fulldate}`)
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let arrayDate = `${fulldate}`.split(' ')
    let setDate
    month.forEach((element, index) => {
        if(`${arrayDate[1]}` == `${element}`){
             setDate = `${arrayDate[2]}/${index+1}/${arrayDate[3]} - ${arrayDate[4]}`
            return 
        }
    });
    return setDate
}

