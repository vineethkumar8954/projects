let searchForm= document.querySelector('.search-form');
document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');
    shoppingcart.classList.remove('active');
    loginform.classList.remove('active');
    navbar.classList.remove('active');
}
let shoppingcart= document.querySelector('.shopping-cart');
document.querySelector('#cart-btn').onclick = () => {
    shoppingcart.classList.toggle('active');
    searchForm.classList.remove('active');
    loginform.classList.remove('active');
    navbar.classList.remove('active');
}
let loginform= document.querySelector('.login-form');
document.querySelector('#login-btn').onclick = () => {
    loginform.classList.toggle('active');
    searchForm.classList.remove('active');
    shoppingcart.classList.remove('active');
    navbar.classList.remove('active');
}
let navbar= document.querySelector('.navbar');
document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    shoppingcart.classList.remove('active');
    loginform.classList.remove('active');
}
document .addEventListener('DOMContentLoaded', () =>{
  const addtocartButtons=document.querySelectorAll('.add-to-cart');
  const cartItenCount = document.querySelector('.icons span');
  const cartitemsList = document.querySelector ('.cart.items');
  const cartTotal = document.querySelector (' .cart.total');
  const sidebar = document.getElementById('sidebar'); 
  let cartItems=[];
  let totalAmount=0;
  addtocartButtons.forEach((buttons,index)=>{
    button.addEventListener('click',()=>{
      const item={
        name: document.querySelectorAll('.card .card-title')[index].textContent,
        price:parseFloat(
          document.querySelectorAll)('.price'[index].tesxtContent.slice(1),
        ),
        quantity:1,
      };
      const exisitingItem= cartItems.find(
        (cartItem)=>cartItem.name===item.name,
      );
      if(exisitingItem){
        exisitingItem.quantity++;
      }
      else{
        cartItems.push(item);
      }
      totalAmount+=item.price;
      updateCartUI();
    });
    function updateCartUI(){
      updateCartItem(cartItems.length);
      updateCartItemList();
      updateCartTotal();
    }
    function UpdateCartItemCount(count){
      cartItemCount.textContent=count;
    }
    function updateCartItemList(){
      cartitemsList.innerHtml='';
      cartItems.forEach((item)=>{
        const cartItem=document.createElement('div');
        cartItem.classList.add('cart-item','individual-cart-item');
        cartItem.innerHtml=`
        <span>(${item.quantity}x)${item.name}</span>
        <span class="cart-item-price>$${(item.price*item.quantity).tofixed(2)}
        <button class="remove-btn" data-index="${index}"><i class="fas fa-trash"></i></button>
        </span>
        `;
        cartitemsList.append(cartItem);
      });
      const removeButtons=document.querySelectorAll('.remove-item');
      removeButtons.forEach((button)=>{
        button.addEventListener('click',(event)=>{
          const index=event.target.dataset.index;
          removeItemFromCart(index);
        });
      });
    }
    function removeItemFromCart(index){
      const removeItem=cartItems.splice(index,1)[0];
      totalAmount-=removeItem.price*remove.quantity;
      updateCartUI();
    }
    function updateCartTotal(){
      cartTotal.tesxtContent=`$${TotalAmount.tofixed(2)}`;
    }
    cartItenCount.addEventListener('click',()=>{
      sidebar.classList.toggle('open');
    });
    const closeButton=document.querySelector('.sidebar-close');
    closeButton.addEventListener('click',()=>{
      sidebar.classList.remove('open');

    });
  });
});