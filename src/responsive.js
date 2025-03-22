const responsive=(device,styles )=>{
    // decide the breakpoints based  on the design
     const max_Width= device==="mobile"?'480px':"840px";
    let styleString=""
    const stylesList= Object.keys(styles)
    for(let styleProperty of stylesList){
      // because objects cannot have hyphens in their   properties,  i use an under_score to supply the properties.
    //    so this function needs to convert that underscore to its css equivalent hyphens 
    // A one-liner, just a simple split and join would do the trick
    const convertToCss=property=>property.split('_').join("-");



        // the  backslash and n adds a new line to give the string a normal css look
     
     styleString+= `${convertToCss(styleProperty)}:${styles[styleProperty]}; \n`
    }
    const responsiveOutput=`
    @media screen and (max-width:${max_Width}){\n
    
    ${styleString}\n
    \n}
    `
    return responsiveOutput
}
export default responsive