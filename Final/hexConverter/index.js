const field = document.querySelector('.window')

const redSlider = document.querySelector('.R')
const greenSlider = document.querySelector('.G')
const blueSlider = document.querySelector('.B')

const redValue = document.querySelector('.redValue')
const greenValue = document.querySelector('.greenValue')
const blueValue = document.querySelector('.blueValue')

const sliders = document.querySelectorAll('input')
const hex = document.querySelector('.hex')


sliders.forEach((slider)=>{
    slider.addEventListener('input',(event)=>{
        const {target} = event
        const value =target.value 
        changeColorValue(target, value)
        const hex = calculateAndSetHexValue()
        changeBackGroundColor(hex)
    })
})

const changeColorValue = (target, value)=>{
    target.nextSibling.nextSibling.innerHTML = value
}

const calculateAndSetHexValue = ()=>{
    const [r,g,b] = [redValue.innerHTML, greenValue.innerHTML, blueValue.innerHTML]
    const hexValue = fullColorHex(r,g,b)

    hex.innerHTML = `#${hexValue}`
    return hexValue
}


const changeBackGroundColor = (hex)=>{
    field.style.backgroundColor = `#${hex}`
}


const fullColorHex = function(r,g,b) {   
    var red = rgbToHex(r);
    var green = rgbToHex(g);
    var blue = rgbToHex(b);
    return red+green+blue;
  };

const rgbToHex = function (rgb) { 
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) {
         hex = "0" + hex;
    }
    return hex;
  };