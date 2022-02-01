function calcCartPrice(){


    const obertkaOfPrice = document.querySelector(`.template__box`);

    let FullPrice = 0;

    const totalPriceEl = document.querySelector(`.full-price`);

    const basketItems = document.querySelectorAll(`.basket__template`);

    basketItems.forEach(function(item){

        const itemsInBox =  item.querySelector(`[data-counter]`);

        const priceEL = item.querySelector(`.card__price`);

        const currentPrice = parseInt(itemsInBox.innerText) * parseInt(priceEL.innerText);

        FullPrice += currentPrice;




    });

//отображаем цену на странице

    totalPriceEl.innerText = FullPrice;

    let delivery;
    let dataDelivery;

    if(FullPrice > 0){
        dataDelivery = document.querySelector(`[data-delivery]`);

        dataDelivery.classList.remove(`hide`);
    }

    if (FullPrice >= 1000){

        delivery = document.querySelector(`.delivery`);
        delivery.innerText = `бесплатно`;


    } else {

        // delivery.innerText = `200 ₽`;

    }
};





function toggleCartStatus () {

const templateBox = document.querySelector(`.template__box`);
const orderForm = document.querySelector(`#order-form`);

if(templateBox.children.length > 0){

    const basketEmptyLabel = document.querySelector(`[data-basket-empty]`);
    basketEmptyLabel.classList.add(`hide`);

    orderForm.classList.remove(`hide`);

} else{

    const basketEmptyLabel = document.querySelector(`[data-basket-empty]`);
    basketEmptyLabel.classList.remove(`hide`);

    orderForm.classList.add(`hide`);

}

};



//счётчики
window.addEventListener(`click`, function(event){


    //minus

    if(event.target.dataset.action == `minus`){


        const parentOfMinus = event.target.closest(`.card__item-counter`);
        let counterForMinus = parentOfMinus.querySelector(`[data-counter]`);





         if(parseInt(counterForMinus.innerText) > 1){

            counterForMinus.innerText = --counterForMinus.innerText;

         }  else if (event.target.closest(`.template__box`) && parseInt(counterForMinus.innerText) === 1 ) {

            event.target.closest(`.basket__template`).remove();

            toggleCartStatus();


            calcCartPrice();
         }




    }



    // plus

    if(event.target.dataset.action == `plus`){

        const parentOfPlus = event.target.closest(`.card__item-counter`);
        const counterForPlus = parentOfPlus.querySelector(`[data-counter]`);

        counterForPlus.innerText = ++ counterForPlus.innerText;

    }



    if(event.target.hasAttribute(`data-action`) && event.target.closest(`.template__box`)){

        calcCartPrice();

    }





});



//Собираем данные с карточек и помещаем в объект

window.addEventListener(`click`, function(event){


    if(event.target.hasAttribute(`data-btn`)){



        const card = event.target.closest(`.card__item`);



        const templateOfCard = {

            id: card.dataset.id,
            src: card.querySelector(`.card__item-img`).getAttribute(`src`),
            title: card.querySelector(`.card__item-title`).innerText,
            counter: card.querySelector(`[data-counter]`).innerText,
            weight: card.querySelector(`.card__weight`).innerText,
            price: card.querySelector(`.card__price`).innerText
        };


        let ObertkaDlyaShablona = document.querySelector(`.template__box`);

        let checkCardId = ObertkaDlyaShablona.querySelector(`[data-id="${templateOfCard.id}"]`);



        if(checkCardId){

            let counterOfEl = checkCardId.querySelector(`[data-counter]`);

            counterOfEl.innerText = parseInt(counterOfEl.innerText) + parseInt(templateOfCard.counter);


        } else{

     const tempForCard = `<div data-id="${templateOfCard.id}" class="basket__template">
     <div class="template__left">
         <img class="template__img" src="${templateOfCard.src}" alt="">
     </div>
     <div class="template__right">
         <h2 class="template__title">${templateOfCard.title}</h2>
         <div class="template__price">
             <p class="card__weight">${templateOfCard.weight}</p>
             <p class="card__price">${templateOfCard.price}</p>
         </div>
         <div class="card__item-counter counter--fortemplate">
          <span class="counter__minus" data-action="minus">-</span>
          <span class="counter__main" data-counter>${templateOfCard.counter}</span>
          <span class="counter__plus" data-action="plus">+</span>
      </div>
     </div>
 </div> <!--basket__template-->`;


            let templateBox = document.querySelector(`.template__box`);

            templateBox.insertAdjacentHTML(`beforeend`, tempForCard);





        }


        //cброс счетчика
        card.querySelector(`[data-counter]`).innerText = `1`;


//отображение статуса корзины
        toggleCartStatus();

        // Пересчет общей стоимости товаров в корзине

        calcCartPrice();




    }



});