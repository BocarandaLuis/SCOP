const userSchema = {
    simple:{username:String, id_tipo_us:Number}
}

export default model("User", userSchema)