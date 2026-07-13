let todayBooks = []
let currentIndex = 0;

async function todayRecommendBooks() {
    const url = `https://dapi.kakao.com/v3/search/book?query=소설&size=50`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `KakaoAK ${KAKAO_REST_API_KEY}` 
            }
        });


        if (!response.ok) {
            throw new Error("책을 불러오지 못했습니다.");
        }

        const dataT = await response.json();
        todayBooks = dataT.documents;

        RRecommendBooks();

    } catch (error) {
        console.log("에러상세", error)
    }
}

todayRecommendBooks();

function RRecommendBooks(){
    const TRecommandBook = document.getElementById("TRecommandBook")
    const mainbook = todayBooks[currentIndex];
    const minibook1 = todayBooks[currentIndex + 1];
    const minibook2 = todayBooks[currentIndex + 2];
    const minibook3 = todayBooks[currentIndex + 3];
    const minibook4 = todayBooks[currentIndex + 4];
    let MainContents = mainbook.contents.length > 50 ? mainbook.contents.slice(0, 50) + "..." : mainbook.contents;


    TRecommandBook.innerHTML =`
        <div id="TRecommandGroup">
            <div class="TodayMain">
                <img src="${mainbook.thumbnail}" alt="${mainbook.title}" class="mainbookThumb">
                <div id="TA"> 
                    <h3 class="mainbooktitle">${mainbook.title}</h3>
                    <div class="mainbookAuthors">${mainbook.authors.join(", ")}</div>
                    <div class="mainbookcontents">${MainContents}</div>
                </div>
            </div>
            <div class="miniBooks">
                <div class="miniBook">
                    <div>
                        <img src="${minibook1.thumbnail}" alt="${minibook1.title}" class="minibookThumb">
                    </div>
                </div>
                <div class="miniBook">
                    <div>
                        <img src="${minibook2.thumbnail}" alt="${minibook2.title}" class="minibookThumb">
                    </div>
                    
                </div>
                <div class="miniBook">
                    <div>
                        <img src="${minibook3.thumbnail}" alt="${minibook3.title}" class="minibookThumb">
                    </div>
                </div>
                <div class="miniBook">
                    <div>
                        <img src="${minibook4.thumbnail}" alt="${minibook4.title}" class="minibookThumb">
                    </div>
                </div>
            </div>
        </div>
    `;
        TRecommandBook.style.cursor = "pointer"
        document.querySelector(".TodayMain") .onclick = ()=>{
            window.open(`my_project_detail.html?title=${encodeURIComponent(mainbook.title)}`);    
        };

        const miniBooks = [minibook1, minibook2, minibook3, minibook4];
        document.querySelectorAll(".miniBook").forEach((mini, index) =>{
            mini.style.cursor = "pointer";
            mini.onclick = ()=>{
                window.open(`my_project_detail.html?title=${encodeURIComponent(miniBooks[index].title)}`);
            }})
        

}


/* <div class="MTA">    
        <div class="minibooktitle">${minibook2.title}</div>
        <div class="minibookAuthors">${minibook2.authors.join(", ")}</div>
    </div>*/

// 버튼

const nextBtn = document.getElementById("nextBtn")
const prevBtn = document.getElementById("prevBtn")

nextBtn.onclick = ()=>{
    if (currentIndex + 5 < todayBooks.length) {
        currentIndex += 5;
    } else {
        currentIndex = 0;
    }
    RRecommendBooks();

    const TRecommandGroup = document.getElementById("TRecommandGroup");
    TRecommandGroup.classList.add("slide")
}

prevBtn.onclick = ()=>{
    if (currentIndex >=5){
        currentIndex -= 5;
    } else { 
        currentIndex = todayBooks.length - 5;
    }
    RRecommendBooks();

    const TRecommandGroup = document.getElementById("TRecommandGroup")
    TRecommandGroup.classList.add("slide")
}
