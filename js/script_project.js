const KAKAO_REST_API_KEY = "66cea5c8bb1fa5f4f543c6d88a1881d1";


async function scatter() {
    const mdCH = document.getElementById("mdCH");
    const bestListBook = document.getElementById("bestListBook");
    const keyword = [
        '소설', '에세이', '시', '경제', '역사', '과학', '경영', '여행', '자기개발'
    ]
    const putKey = keyword[Math.floor(Math.random() * keyword.length)]
    const url = `https://dapi.kakao.com/v3/search/book?query=${putKey}&size=6`




    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `KakaoAK ${KAKAO_REST_API_KEY}` 
            }
        });

        if (!response.ok) {
            throw new Error("네트워크 응답에 문제가 발생했어요.")
        }
        
        const data = await response.json();
        const books = data.documents;

        books.forEach(book =>{
            mdCH.appendChild(createCard(book))
            bestListBook.appendChild(createCard(book))
        })

    } catch (error) {
        console.log("에러상세", error);

    }
   
}

scatter();

function createCard(book) {

        const card = document.createElement("div");
        card.className = "book-card";

        const thumbnail = book.thumbnail ? book.thumbnail : "https://placeholde.co/150x220?text-No+Image";
        const title = book.title ? book.title : ""

        card.innerHTML = `
            <img class="book-thumbnail" src="${thumbnail}" alt="${title}" 표지>
            <div class="book-title">${title}</div>
        `

        card.style.cursor = "pointer"
        card.onclick = ()=>{
            window.open(`my_project_detail.html?title=${encodeURIComponent(book.title)}`);    
        };
        
        return card;
};
