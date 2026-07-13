

//가져온 쿼리값을 조회 후 화면에 결과를 뿌려준다.
async function searchBooksBtn() {
   
    
    let searchQuery = document.getElementById("userSearch").value.trim();
    const searchBList = document.getElementById("searchBList")
    const url = `https://dapi.kakao.com/v3/search/book?query=${encodeURIComponent(searchQuery)}&size=12`


    searchBList.innerHTML = '<p style="grid-column:1/-1; text-align:center;">도서를 검색중입니다...</p>';


    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {'Authorization' : `KakaoAK ${KAKAO_REST_API_KEY}`}
        });

        if (!response.ok) {
        throw new Error("네트워크 응답에 문제가 발생했어요.")
        };

        const searchData = await response.json();
        const searchBooks = searchData.documents;

        if (searchBooks.length === 0) {
            searchBList.innerHTML = '<p style="grid-column:1/-1; text-align:center;">검색결과가 없습니다...</p>';
        }

        searchBList.innerHTML = "";

        searchBooks.forEach(book => {
            const cardS = document.createElement("div");
            cardS.className = "book-cardS"

            const sThumbnail = book.thumbnail ? book.thumbnail : "https://placehold.co/120x174?text-No-Image"
            const sAuthor = book.authors > 0 ? book.authors.join(", ") : "저자미상"
            const sPrice = book.sale_price ? `${book.sale_price.toLocaleString()}원` : "판매중지/가격미정";
            
            cardS.innerHTML = `
                    <img class="searchBook-thumbnail" src="${sThumbnail}" alt="${book.title}">
                    <div class="searchBook-title">${book.title}</div>
                    <div class="searchBook-authors">${sAuthor}</div>
                    <div class="searchBook-price">${sPrice}</div>      
            `
            cardS.style.cursor = 'pointer'
            cardS.onclick = () =>{
                window.open(`my_project_search.html?query=${encodeURIComponent(searchQuery)}&size=12`)
            }

            searchBList.appendChild(cardS)
        });
    } catch (error) {
        console.log("에러상세", error);
        searchBList.innerHTML = '<p style="grid-column: 1/-1; text-align:center;">데이터 로딩 중 에러발생</p>';
    }

    
}