// "axios"/ "modern-normalize" /"notiflix" /"tui-pagination" - вже встановлено
// console.log('hello');
import Pagination from 'tui-pagination'; 
import {testArr} from './test/test-coctails'
import 'tui-pagination/dist/tui-pagination.css';

import spriteUrl from '/img/svg/sprite.svg';
import defaultImg from '/img/mobile/coctail@2x.webp';



export function pagiation(cocList, cardMarkup){
    let numberOfPhoto = 9;
    let maxNumberOfPaginator = 3;
    // console.log(cardMarkup);
    
    const container = document.getElementById('tui-pagination-container');
    
    

    const instance = new Pagination(container, {
        totalItems: cocList.length,
        itemsPerPage: numberOfPhoto,
        visiblePages: maxNumberOfPaginator,
    }).getCurrentPage();

    const createNewArr= () =>{
        let newArr = [];
        let numberOfPhotoJ=numberOfPhoto;
        let j = 0;
        for (let i=0; i<Math.ceil(cocList.length/numberOfPhoto); i++){
            newArr.push([]);
            for(j; j<numberOfPhotoJ; j++){
                if (cocList[j]===undefined){break}
                newArr[i].push(cocList[j])
            }
            numberOfPhotoJ+=numberOfPhoto;
        }
        return newArr;      
    }
    
    console.log(createNewArr());
    



    const renderCards = (currentItemPaginator) =>{
         console.log(currentItemPaginator);
         console.log(createNewArr()[currentItemPaginator]);
         console.log("");

            
            const markup = createNewArr()[currentItemPaginator].map((item) => {
            const { _id, drink, drinkThumb, description } = item;
              return `
              <li class="cocktail-card" id="${_id}">
                      <img class="cocktail-image" src="${drinkThumb}" onerror="this.src='${defaultImg}'" alt="${drink}" loading="lazy" width="307" height="257"/>
                      <h3 class="cocktail-name">${drink.slice(0, 25)}</h3>
                      <p class="cocktail-info">${description.slice(0, 115) + '...'}</p>
                      <div class="btns-info">
                          <button type="button" data-action="learnmore" class="js-learn-more learn-more-button" id="${_id}">Learn more</button>
                          <button type="button" data-action="addtofav" class="js-add-to add-to-button" id="${_id}">
                              <svg class="icon-heart" width="18px" height="18px">
                                  <use href="${spriteUrl}#icon-heart"></use>
                              </svg>
                          </button>
                      </div>
                  </li>
              `;
            }).join("");
        
            document.querySelector('.cocktails-list').innerHTML= markup;
            
    }
     renderCards(0);

    
        
        
        
        
        
        
       

         
    const addClassNumber = ()=>{
        const arrOfAllItem = Array.from(document.querySelectorAll(".tui-page-btn"));
        arrOfAllItem.forEach(item=>{
            if (Number.isInteger(Number(item.textContent))) {
                item.classList.add("tui-number-item")
            }
        }) 
    }
    addClassNumber();

 


    function clickFunc(e){
        
        addClassNumber();
        if (e.target===e.currentTarget ){
             console.log("out button")
              return;
        }

        if (e.target.classList.contains("tui-prev") || e.target.classList.contains("tui-ico-prev") ) {
                console.log("1");
                console.log(createNewArr()[Number(document.querySelector('.tui-is-selected').textContent)-1]);
                renderCards(Number(document.querySelector('.tui-is-selected').textContent)-1);   
        }
        
        if ( e.target.classList.contains("tui-next") || e.target.classList.contains("tui-ico-next") && e.target.classList.contains("tui-is-disabled")===false){
              console.log("2")
              console.log(createNewArr()[Number(document.querySelector('.tui-is-selected').textContent)-1]);
              renderCards(Number(document.querySelector('.tui-is-selected').textContent)-1);
        }

        if(e.target.classList.contains("tui-number-item")){
            console.log(Number(e.target.textContent)-1)
            console.log(createNewArr()[Number(e.target.textContent)-1])
            renderCards(Number(e.target.textContent));
        }
    }

        

        container.addEventListener("click", clickFunc);
    }



// const mrkp =`<li class="cocktail-list__cocktail-item">
// <img class="cocktail-item_img" src="${drinkThumb}" alt="preview cocktail" width="316" height="auto">
// <h2 class="cocktail-item__name">${drink}</h2>
// <p class="cocktail-item__description">${description}</p>
// <div class="button-wrap" data-id-drink='${_id}'>
//     <button type="button" class="cocktail-item__learn-more">Learn more</button>
//     <button type="button" class="cocktail-item__"></button>
//         <svg class="svg" width="21" height="19">
//             <use href=""></use>
//         </svg>
//     </button>
// </div>
// </li>`;

// pagiation(testArr,mrkp)
