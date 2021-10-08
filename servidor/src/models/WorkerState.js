export const productsPerJob = (value) => {
    // if(value == 1) return [{id_prod:1, cant:0}, {id_prod:2, cant:0}, {id_prod:3, cant:0}]
    if(value == 1) return [{name_prod: "Jumbo", id_prod:1, cant:0}, {name_prod: "Lump", id_prod:2, cant:0}]
    if(value == 2) return [{name_prod: "Claw", id_prod:4, cant:0}, {name_prod: "Cocktail", id_prod:5, cant:0}]
    if(value == 3) return [{name_prod: "R/Lump",id_prod:9, cant:0}]
    if(value == 4) return [{name_prod: "R/Claw", id_prod:10, cant:0}, {name_prod: "R/Cocktail",id_prod:12, cant:0}]
    if(value == 5) return [{name_prod: "Cesta/Desc", id_prod:11, cant:0}]
    if(value == 6) return [{name_prod: "R/Jumbo", id_prod:8, cant:0}]
}