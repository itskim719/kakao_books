const btnBf = document.getElementById("btnBf");
const btnAt = document.getElementById("btnAt");

// const REST_API_KEY = "66cea5c8bb1fa5f4f543c6d88a1881d1";

function ranD() {
        const keyW = ["소설", "에세이", "경제", "역사", "교육", "경영", "정치"];
        let randomValue = keyW[Math.floor(Math.random() * keyW.length)];
        return randomValue;
}

async function dataBtn() {

    
    
    const url = `https:/dapi.kakao.com/v3/search/book?query=${ranD()}&size=6`;

    const response = await fetch(url, {
            method: 'GET',
            headers: {'Authorization' : `KakaoAK ${KAKAO_REST_API_KEY}`}
        });
    
    if (!response.ok) {
        throw new Error("네트워크 응답에 문제가 발생하였습니다.")
    }

    const dataB = await response.json();
    // console.log(data);
    const booksB = dataB.documents
    const recommendPub = document.getElementById("recommendPub")

    recommendPub.innerHTML = "";

    booksB.forEach(book => {
        const cardB =document.createElement("div");
        cardB.className = "recoCard";
        
        const reThumbnail = book.thumbnail ? book.thumbnail : "https://placehold.co/120x174?text-No-Image"
        const retitle = book.title ? book.title : "전송실패"

        cardB.innerHTML = `
            <img src="${reThumbnail}" alt="${retitle}" class="book-reThumbnail">
            <div class="book-retitle" title="${retitle}">${retitle}</div>
        `
        cardB.style.cursor = 'pointer'
        cardB.onclick = ()=>{
            window.open(`my_project_detail.html?title=${encodeURIComponent(book.title)}`);
        }
        
        recommendPub.appendChild(cardB);

    });    
}
dataBtn();
btnBf.addEventListener("click", dataBtn);
btnAt.addEventListener("click", dataBtn);



// cardB.style.cursor = 'pointer'
// cardB.onclick = ()=>{
//     window.open(book.url, '_blank');
// }