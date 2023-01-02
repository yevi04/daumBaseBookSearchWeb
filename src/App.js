import React from 'react';
import './App.css';
const App = () => {
  return (
    <div
      style={{
        display: 'flex',
        padding: 30,
        alignItems: 'center',
        flexDirection: 'column',
        width: window.innerWidth - 60,
        height: window.innerHeight,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'row', marginBottom: 25, width: '80%', justifyContent: 'center'}}>
        <input
          type='text'
          placeholder='검색어를 입력하세요'
          style={{ width: '50%', height: 40, marginRight: 15, padding: 10, outline: 'none', borderRadius: 5, fontSize:15, fontWeight: 'bold', paddingLeft: 25}}
          id='input'
        />
        <input
          type='button'
          onClick={() =>
            KakaoSearchApi(
              '/v3/search/book',
              `&size=10&page=10&target=title`
            )
          }
          value='검색'
          style={{ width: 85, height: 65, textAlign: 'center' }}
        />
      </div>
      <div id='info'>
        
      </div>
    </div>
  );
};

const KakaoSearchApi = (root, options) => {
  let url = `https://dapi.kakao.com${root}?query=${encodeURI(
    document.getElementById('input').value
  )}${options}`;

  let data = document.getElementById('input').value !== '' ? fetch(url, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'KakaoAK b1f8f739bb057a196a0c20ba4806b15e',
    },
  }).then((response) => {
    response.text().then((res) => {
      const jsonString = JSON.parse(res.toString());
      if (window.confirm('판매 중인 책의 정보를 불러오시겠습니까?')) {
        document.getElementById('info').innerHTML = ''
        if(jsonString.documents.length > 0){
          for (let i = 0; i < 10; i++) {
            const authors = jsonString.documents[i].authors[0]
            const url = jsonString.documents[i].url
            const title = jsonString.documents[i].title
            const datetime = jsonString.documents[i].datetime.substring(0, 10).split('-')
            const publisher = jsonString.documents[i].publisher
            const thumbnail = jsonString.documents[i].thumbnail !== '' ? `${jsonString.documents[i].thumbnail}` : 'https://search1.kakaocdn.net/thumb/C116x164.q85/?fname=http://search1.daumcdn.net/search/statics/common/img/noimg/4grid.png'
            const sale_price = jsonString.documents[i].sale_price === -1 ? '' : '판매가: ' + jsonString.documents[i].sale_price.toString() + '원<br>'
            const status = jsonString.documents[i].sale_price === -1 ? '품절 혹은 절판' : jsonString.documents[i].status
            if(status != '품절 혹은 절판'){
              document.getElementById('info').innerHTML += 
            `
              <a href=${url}>
                <div class='infoTemplate'>
                  <img src=${thumbnail} class='infoImage'/>
                  <div class='infoText'>
                    <span class='title'>${title}</span><br>
                    대표 저자: ${authors}<br>
                    출판: ${publisher}</a> | ${datetime[0]}년${datetime[1]}월${datetime[2]}일<br>
                    ${sale_price}
                    판매 상태: ${status}
                  </div>
                </div>
              </a>
            `;
            }
          };
        }
        if(document.getElementById('info').innerHTML == ''){
          document.getElementById('info').innerHTML += 
        `
            <div class='this_keyword_book_not_sale'>
              판매중인 책이 없습니다.
            </div>
        `;
        } else {
            if(window.confirm('가장 맨 하단 정보로 스크롤 하시겠습니까?')){
              document.documentElement.scrollTop = document.documentElement.scrollHeight;
            }
        }
        
      };
    });
  }) : alert('검색어를 입력해주세요');
};

export default App;
