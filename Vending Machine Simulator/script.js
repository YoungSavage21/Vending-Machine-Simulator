const color = ['#F90716','#7900FF', '#548CFF', '#EF2F88', '#f7406b', '#FF8E00', '#FFE400', '#8843F2', '#23049D', '#00EAD3', '#91C788', '#F4F4F4']


if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready(){
    const removeButton = document.getElementsByClassName('btn-danger')
    var lightSwitch = document.getElementsByClassName('lightSwitch')[0]
    var neonSwitch = document.getElementsByClassName('fa-light-switch-on')[0]
    var clickMe = document.getElementsByClassName('clickText')[0]
    var root = document.querySelector(':root')
    var colorIndex = 0
    // var randomNumber = getRandomNumber()
    
    lightSwitch.addEventListener('click', function(){
        
        colorIndex++
        if(colorIndex > color.length - 1){
            colorIndex = 0
        }

        clickMe.remove()
        root.style.setProperty('--neon', color[colorIndex])
        if (neonSwitch.classList.contains('fa-light-switch-on')){
        neonSwitch.classList.remove('fa-light-switch-on')
            neonSwitch.classList.add('fa-light-switch-off')
        } else{
            neonSwitch.classList.remove('fa-light-switch-off')
            neonSwitch.classList.add('fa-light-switch-on')
        }
        sound()
    })
    var cartNum = document.getElementsByClassName('cartButton')[0]
    var body = document.getElementsByClassName('body')[0]
    var container = document.getElementsByClassName('container')[0]
    var intro = document.getElementsByClassName('intro')[0]

    cartNum.addEventListener('click', function(){
        if (container.classList.contains('blank')){
            body.classList.add('blank')
            intro.classList.add('blank')
            container.classList.remove('blank')
        } else{
            container.classList.add('blank')
            body.classList.remove('blank')
            intro.classList.remove('blank')
        }
        sound()
    })



for (var i = 0; i < removeButton.length; i++){
    var button = removeButton[i]
    button.addEventListener('click', removeCartItem)

    }

var quantityInputs = document.getElementsByClassName('cart-quantity-input')
for (var i = 0; i < quantityInputs.length; i++){
    var input = quantityInputs[i]
    input.addEventListener('change', quantityChanged)
    
}

var addToCart = document.getElementsByClassName('items')
for (var i = 0; i < addToCart.length; i++){
    var cartButton = addToCart[i]
    cartButton.addEventListener('click',  (cartButton) => {
        addToCartClicked(cartButton)
        addedToCart()
    })
    
}
document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)

}

function sound(){
    var sound = document.getElementById('clickSound')
    sound.play()
}

function addToCartClicked(currentButton){
    var button = currentButton.target
    var shopTitle = button.parentElement.getElementsByClassName('title')[0].innerText
    var shopPrice = button.parentElement.getElementsByClassName('price')[0].innerText
    var images = button.parentElement.getElementsByClassName('items')[0].src
    addItemToCart(shopTitle, shopPrice, images)
    updateCart()
}


function addItemToCart(shopTitle, shopPrice, images ){


    var cartRow = document.createElement('div')
    var cartItems= document.getElementsByClassName('cart-items')[0]
    
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++){
        if(cartItemNames[i].innerText == shopTitle){
                var current = cartItemNames[i]
                var quantity = current.parentElement.parentElement.getElementsByClassName('cart-quantity-input')[0]
                quantity = quantity.value++

            
            return
        }
    }
    
    
    
    
    
    var cartRowContents = `<div class="cart-item cart-column">
    <img class="cart-item-image" src="${images}" width="100" height="100">
    <span class="cart-item-title neon">${shopTitle}</span>
    </div>
    <span class="cart-price cart-column neon">${'$' + shopPrice}</span>
    <div class="cart-quantity cart-column">
    <input class="cart-quantity-input neon" type="number" value="1">
    <button class="btn btn-danger neon" type="button">REMOVE</button>
    </div>`
    
    cartRow.innerHTML = cartRowContents
    cartRow.classList.add('cart-row')
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}


function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCart()
}

function quantityChanged(event){
    var input = event.target
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updateCart()
}

function updateCart(){
    var container = document.getElementsByClassName('cart-items')[0]
    var cartRows = container.getElementsByClassName('cart-row')
    var total = 0
    quantityTotal = 0

    for (var i = 0; i < cartRows.length; i++){
        var cartRow = cartRows[i]
        var cartPrice = cartRow.getElementsByClassName('cart-price')[0]
        var cartQuantity = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(cartPrice.innerText.replace('$', ''))
        var quantity = parseInt(cartQuantity.value)

        quantityTotal = quantityTotal + quantity
        total = total + (price*quantity)
}
    total = Math.round(total * 100) / 100
    document.getElementById('cartNum').innerText = quantityTotal
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
    sound()
}

function purchaseClicked(){
    alert('Thank You For Your Purchase')
    var cartItems =document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCart()
}

function addedToCart(){
    var intro = document.getElementsByClassName('intro')[0]
    console.log(intro.innerText)
    intro.innerText = "Added To Cart"
    setTimeout(function(){
        intro.innerText = "What Would You Like To Purchase?"
    }, 2000)

 

}


