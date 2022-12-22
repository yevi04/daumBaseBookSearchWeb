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
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <input
          type='text'
          style={{ width: 400, height: 40, marginRight: 15 }}
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
          style={{ width: 85, height: 45, textAlign: 'center' }}
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

  let data = fetch(url, {
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
          console.log(jsonString.documents[i])
          document.getElementById('info').innerHTML += `<a href='${
            jsonString.documents[i].url
          }'>
            <div class='infoText'>
              <img src='${jsonString.documents[i].thumbnail}' class='test'/>
              <div>
              책 이름 : ${jsonString.documents[i].title}<br>
              가격 : ${jsonString.documents[i].price.toString()}<br>
              </div>
            </div>
          </a>`;
        }
      }
    });
  });
};

export default App;
