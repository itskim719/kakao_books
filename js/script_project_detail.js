const params = new URLSearchParams(window.location.search);
const title = params.get('title')

console.log('title')
const REST_API_KEY = "66cea5c8bb1fa5f4f543c6d88a1881d1";
let salePrice = 0;

async function fetchBookInfo() {
   
    try {
        const response = await fetch(`https://dapi.kakao.com/v3/search/book?query=${encodeURIComponent(title)}`, {
            method: "GET",
            headers: {
                "Authorization": `KakaoAK ${REST_API_KEY}` 
            }
        });

        if (!response.ok) {
            throw new Error("API요청이 실패했어요");
        }
        
        const dataClickUrl = await response.json();
        
        if (dataClickUrl.documents && dataClickUrl.documents.length > 0){
            renderBookInfo(dataClickUrl.documents[0]);
        } else {
            document.getElementById("book-Dtitle").innerText = '검색결과가 없어요';
        }
    } catch (error){
        console.log("에러발생", error);
        document.getElementById("book-Dtitle").innerText = '데이터를 가져오지 못했어요'
    }
}

function renderBookInfo(book){
    salePrice = book.sale_price > 0 ? book.sale_price : book.price;

    let originalThumbnail = book.thumbnail;
    if (originalThumbnail && originalThumbnail.includes('/thumb/R120x174.q85/?fname=')){
        originalThumbnail = decodeURIComponent(originalThumbnail.split('?fname=')[1]);

        document.getElementById("bookDetail-thumbnail").src = originalThumbnail || "https://placeholde.co/150x220?text-No+Image";
        document.getElementById("book-Dtitle").innerText = book.title;
        document.getElementById("book-contents").innerText = book.contents

        const authors = book.authors? book.authors.join(", ") : '저자 정보 없음'
        const publisher = book.publisher;
        const isbn = book.isbn? book.isbn.split(" ")[0] : "ISBN정보 없음";
        document.getElementById("book-meta").innerText = `저자 ${authors} | ${publisher} | ISBN : ${isbn}`

        document.getElementById("price-original").innerText = `${book.price.toLocaleString()}원`;
        document.getElementById("price-sale").innerText = `${book.sale_price.toLocaleString()}원`

        updateTotalPrice(1);

        
        const summary = book.contents;
        const translators = book.translators;
        document.getElementById("bookEX").innerHTML=`
            <div id="bookIntr">    
                <h3 class="namePadding">📖 책 소개</h3>
                <div id="book-summary">${summary}</div>
            </div>
            <div id="authorsBox">
                <h3 class="namePadding">🖋️ 작가정보</h3>
                <div>
                    <div id="authorInfo">${authors}</div>
                    <div id="book-translators>${translators}</div>
                </div>
            </div>
        `
    }
}

function updateTotalPrice (quantity) {
    const totalAmountEL = document.getElementById("total-amount")
    const total = salePrice * quantity;
    totalAmountEL.innerText = `${total.toLocaleString()}원`
}

function changeQuantity(delta){
    const qty = document.getElementById("quantity");
    console.log(qty);
    let currentQty = parseInt(qty.value);

    currentQty += delta
    if (currentQty < 1) currentQty = 1;

    qty.value = currentQty;
    updateTotalPrice(currentQty);
}

fetchBookInfo();