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
      {
        /**
         * 
         * 
         * <div>
        <button
          onClick={() => setSort('accuracy')}
          style={
            sort === 'accuracy'
              ? {
                  backgroundColor: 'black',
                  color: 'white',
                  marginRight: 10,
                  marginTop: 10,
                }
              : {
                  backgroundColor: 'white',
                  color: 'black',
                  marginRight: 10,
                  marginTop: 10,
                }
          }
        >
          정확도순
        </button>
        <button
          onClick={() => setSort('latest')}
          style={
            sort === 'latest'
              ? { backgroundColor: 'black', color: 'white' }
              : { backgroundColor: 'white', color: 'black' }
          }
        >
          발간일순
        </button>
      </div>
         */
      }
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
      Authorization: 'KakaoAK b1f8f739bb057a196a0c20ba4806b15e',
    },
  }).then((response) => {
    response.text().then((res) => {
      const jsonString = JSON.parse(res.toString());
      alert('검색 성공!!');
      if (window.confirm('정보를 불러오시겠습니까?')) {
        for (let i = 0; i < 10; i++) {
          console.log(jsonString.documents[i].thumbnail)
          const thumbnail = jsonString.documents[i].thumbnail !== '' ? `${jsonString.documents[i].thumbnail}` : 'https://search1.kakaocdn.net/thumb/C116x164.q85/?fname=http://search1.daumcdn.net/search/statics/common/img/noimg/4grid.png'
          const sale_price = jsonString.documents[i].sale_price === -1 ? '재고없음' : jsonString.documents[i].sale_price.toString() + '원'
          document.getElementById('info').innerHTML += `<a href='${
            jsonString.documents[i].url
          }'>
            <div class='infoTemplate'>
              <img src=${thumbnail} class='infoImage'/>
              <div class='infoText'>
                <span class='title'>${jsonString.documents[i].title}</span><br>
                판매가: ${sale_price}<br>
              </div>
            </div>
          </a>`;
        }
      }
    });
  }) : alert('검색어를 입력해주세요');
};

export default App;
