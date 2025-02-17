const menu=document.getElementById('Menu');


const modal=document.getElementById('card-modal');


const cartbtn=document.getElementById('cart-btn');

const cartItems =document.getElementById('cart-items')
const cardClose=document.getElementById('close-modal-btn');
const QuantidadeTotal=document.getElementById('cart-total');
const Checkout=document.getElementById('checkout-btn');
const cardCount=document.getElementById('card-count');
const endereco=document.getElementById('adress');
const enderecoAviso=document.getElementById('adreess-warn');
const Datespan=document.getElementById('date-span');

const cart=[]

cartbtn.addEventListener('click',()=>{
    modal.style.display='flex';
})


cardClose.addEventListener('click',()=>{
    modal.style.display='none';
})


modal.addEventListener('click',(event)=>{
    if (event.target===modal) {
        modal.style.display='none';
    }
})


menu.addEventListener('click', function (event) {
    
    let parentbutton= event.target.closest(".ad-cart-btn")




    if (parentbutton) {
        
        const name=parentbutton.getAttribute("data-name")
        const price=parseFloat(parentbutton.getAttribute("data-price"))
     
        Addtocart(name,price)
    }
   
})


function Addtocart(name,price) {
  


    const ExistItem=cart.find(  ex=>ex.name===name)


    if (ExistItem) {
        ExistItem.quantity += 1;
      
    }
    else{
 cart.push(

        {   name,
            price,
    
            quantity:1,
        }
    )

    }

UpdateModaL()
   
}


function UpdateModaL() {

    cartItems.innerHTML=""
   let total=0;

    cart.forEach( item =>{
        const Itemelement=document.createElement("div");
     
        Itemelement.classList.add("flex", "justify-between", "mb-4", "flex-col")
        Itemelement.innerHTML=` <div>
        
        <div class="flex items-center justify-between">
        <p class="font-medium">${item.name}</p>
          <p class="font-medium mt-2">Qtd: ${item.quantity}</p>
           <p>${item.price}</p>


           
        </div>

       
        <button class="remove-cart" data-name="${item.name}">Remover</button>
     
        
        </div>`

      
        cartItems.appendChild(Itemelement) 
         total += item.price * item.quantity;
    })
    
    QuantidadeTotal.textContent=total.toLocaleString(
        "pt-AO",{style:"currency", currency:"AOA"} 
    );
    cardCount.innerHTML=cart.length;
}


cartItems.addEventListener("click",function (event) {
    if (event.target.classList.contains("remove-cart")) {
        const name=event.target.getAttribute("data-name")
   
   RemoveItem(name)
    }
    
})


function RemoveItem(name) {
   const index=cart.findIndex( x=>x.name ===name) 

   if (index !== -1) {
    
    const item=cart[index]


    if (item.quantity > 1) {
        item.quantity -= 1
        UpdateModaL()
        return;
    }

    cart.splice(index,1)
    UpdateModaL()
   }
}


endereco.addEventListener("click", (event)=>{

    let inputValue_ =event.target.value;

    if (inputValue_ !== "") {

        enderecoAviso.classList.add("hidden")
        endereco.classList.remove("border-red-500")
    }
})



Checkout.addEventListener("click", ()=>{

 const isOpen= CheckREstOpen();
 if (!isOpen) {
    Toastify({
        text: "Fechado de momento",
        duration: 3000,
     
        newWindow: true,

        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: " #ef4444#",
        },
        onClick: function(){} // Callback after click
      }).showToast();
    return; 
 }
if (cart.length===0) {
    return;
}

if (endereco.value==="") {
    
    enderecoAviso.classList.remove("hidden")
    endereco.classList.add("border-red-500")
    return;
}


const CartItems=cart.map( item=>{

    return (
`${item.name} Quantidade:${item.quantity}  Preço: ${item.price} |`

        
    )
}).join("")



const message=encodeURIComponent(CartItems)
const phone="949941234"
window.open(`https://wa.me/${phone}?text=${message} Endereço:${endereco.value}`, "_blank")

cart = [];
UpdateModaL();
})









function CheckREstOpen() {
    
    const data=new Date();
    const hora=data.getHours();
    return hora >= 8 && hora < 22;



}

const OpenRestaurant=CheckREstOpen();

if (OpenRestaurant) {
    
    Datespan.classList.remove("bg-red-500")
    Datespan.classList.add("bg-green-600")
}else{
    Datespan.classList.add("bg-red-500")
    Datespan.classList.remove("bg-green-600")
}