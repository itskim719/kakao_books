// const KAKAO_REST_API_KEY = "66cea5c8bb1fa5f4f543c6d88a1881d1";


async function scatterAlist() {
    const aiRFList = document.getElementById("aiRFList");
    const keyword2 = [
        '소설', '에세이', '시', '경제', '역사', '과학', '경영', '여행', '자기개발'
    ]
    const putKey2 = keyword2[Math.floor(Math.random() * keyword2.length)]
    const url4 = `https://dapi.kakao.com/v3/search/book?query=${putKey2}&size=4`




    try {
        const response = await fetch(url4, {
            method: "GET",
            headers: {
                "Authorization": `KakaoAK ${KAKAO_REST_API_KEY}` 
            }
        });

        if (!response.ok) {
            throw new Error("네트워크 응답에 문제가 발생했어요.")
        }

        const dataA = await response.json();
        const booksA = dataA.documents;

        booksA.forEach (book => {
            const cardA = document.createElement("div");
            cardA.className = "book-cardA";

            const Athumbnail = book.thumbnail ? book.thumbnail : "https://placeholde.co/150x220?text-No+Image";
            const Atitle = book.title ? book.title : ""

            cardA.innerHTML = `
                <img class="book-Athumbnail" src="${Athumbnail}" alt="${Atitle}" 표지>
                <div class="book-Atitle">${Atitle}</div>
            `
            cardA.style.cursor = "pointer"
            cardA.onclick = ()=>{
                window.open(`my_project_detail.html?title=${encodeURIComponent(book.title)}`);
            }

            aiRFList.appendChild(cardA);
        });
    } catch (error) {
        console.log("에러상세", error);

    }
   
}

scatterAlist();


