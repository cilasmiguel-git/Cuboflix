import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router';

import './movie-grid.scss';

import MovieCart from '../movie-cart/MovieCart';
import { OutlineButton } from '../button/Button';
import Input from '../input/input';
import Button from '../button/Button';

import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi';
//prototipo FALHO
/*
const MovieGrid = props => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const { keyword } = useParams();
  useEffect(() => {
    const getList = async () => {
      try {
        let response = null;
        if (keyword === undefined) {
          const params = {};
          switch (props.category) {
            case category.movie:
              response = await tmdbApi.getMoviesList(movieType.upcoming, { params });
              break;
            default:
              response = await tmdbApi.getTvList(tvType.popular, { params });
          }
        } else {
          const params = {
            query: keyword
          };
          response = await tmdbApi.search(props.category, { params });
        }

        if (response && response.results) {
          setItems(response.results);
          setTotalPage(response.total_pages);
        } else {
          console.error('Response or response.results are not defined.');
        }
      } catch (error) {
        console.error(error);
      }
    };
    getList();
  }, [props.category, keyword]);
  const loadMore = async () => {
    try {
      let response = null;
      if (keyword === undefined) {
        const params = { page: page + 1 };
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMoviesList(movieType.upcoming, { params });
            break;
          default:
            response = await tmdbApi.getTvList(tvType.popular, { params });
        }
      } else {
        const params = {
          page: page + 1,
          query: keyword
        };
        response = await tmdbApi.search(props.category, { params });
      }
      if (response && response.results) { 
        setItems([...items, ...response.results]);
        setPage(page + 1);
      } else {
        console.error('Response or response.results are not defined.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="section mb-3">
        <MovieSearch category={props.category} keyword={keyword}/>
      </div>
      <div className='movie-grid'>
        {items.map((item, i) => (
          <MovieCart category={props.category} item={item} key={i} />
        ))}
      </div>
      {page < totalPage ? (
        <div className='movie-grid__loadmore'>
          <OutlineButton className='small' onClick={loadMore}>
            Load more
          </OutlineButton>
        </div>
      ) : null}
    </>
  );
};
*/
/*
const MovieSearch = props => {

  const navigate = useNavigate();

  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');

  const goToSearch = useCallback(
    () => {
      if(keyword.trim().length > 0){
        navigate(`${category[props.category]}/search/${keyword}`);
      }
    },
    [keyword,props.category,navigate],
  )

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();
      if(e.keyCode === 13){
        goToSearch();
      }
    }
    document.addEventListener('keyup',enterEvent);
    console.log(keyword);
    return () => {
      document.removeEventListener('keyup',enterEvent);
    }
  }, [keyword,goToSearch])
  
  
  return (
    
      <div className="movie-search">
        <Input type="text" placeholder="Enter keyword" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      </div>
    
  )

}
*/

// MAIN CODE
const MovieGrid = props => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [keyword, setKeyword] = useState('');


  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    const getList = async () => {
      try {
        let response = null;
        if (keyword === undefined) {
          const params = {};
          switch (props.category) {
            case category.movie:
              response = await tmdbApi.getMoviesList(movieType.upcoming, { params });
              break;
            default:
              response = await tmdbApi.getTvList(tvType.popular, { params });
          }
        } else {
          const params = {
            query: keyword
          };
          response = await tmdbApi.search(props.category, { params });
        }

        if (response && response.results) {
          setItems(response.results);
          setFilteredItems(response.results);
          setTotalPage(response.total_pages);
        } else {
          console.error('Response or response.results are not defined.');
        }
      } catch (error) {
        console.error(error);
      }
    };
    getList();
  }, [props.category, keyword]);

  useEffect(() => {
    const getPopularItems = async () => {
      try {
        let response = null;
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMoviesList(movieType.popular);
            break;
          default:
            response = await tmdbApi.getTvList(tvType.popular);
        }
  
        if (response && response.results) {
          setItems(response.results);
          setFilteredItems(response.results);
          setTotalPage(response.total_pages);
        } else {
          console.error('Response or response.results are not defined.');
        }
      } catch (error) {
        console.error(error);
      }
    };
    getPopularItems();
  }, [props.category]);
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredItems(items);
      return;
    }

    const filtered = items.filter(item => {
      return item.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredItems(filtered);
  }, [searchTerm, items]);

  const loadMore = async () => {
    try {
      let response = null;
      if (keyword === undefined) {
        const params = { page: page + 1 };
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMoviesList(movieType.upcoming, { params });
            break;
          default:
            response = await tmdbApi.getTvList(tvType.popular, { params });
        }
      } else {
        const params = {
          page: page + 1,
          query: keyword
        };
        response = await tmdbApi.search(props.category, { params });
      }
      if (response && response.results) { 
        setItems([...items, ...response.results]);
        setPage(page + 1);
      } else {
        console.error('Response or response.results are not defined.');
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="section mb-3">
      <MovieSearch category={props.category} keyword={keyword} setKeyword={setKeyword} />
      </div>
      <div className='movie-grid'>
        {items.map((item, i) => (
          <MovieCart category={props.category} item={item} key={i} />
        ))}
      </div>
      {page < totalPage ? (
        <div className='movie-grid__loadmore'>
          <OutlineButton className='small' onClick={loadMore}>
            Load more
          </OutlineButton>
        </div>
      ) : null}
    </>
  );
}

const MovieSearch = (props) => {
  const navigate = useNavigate();
  const { category: categoryParam, keyword } = useParams();

  const [searchKeyword, setSearchKeyword] = useState(keyword || '');

  const handleSearch = useCallback(() => {
    if (searchKeyword.trim().length > 0) {
      props.setKeyword(searchKeyword);
      navigate(`/${categoryParam}/search/${searchKeyword}`);
    }
  }, [props, searchKeyword, categoryParam, navigate]);

  const handleInputChange = useCallback(
    (e) => {
      setSearchKeyword(e.target.value);
    },
    [setSearchKeyword]
  );

  const handleEnterKey = useCallback(
    (e) => {
      if (e.keyCode === 13) {
        handleSearch();
      }
    },
    [handleSearch]
  );

  useEffect(() => {
    document.addEventListener('keyup', handleEnterKey);

    return () => {
      document.removeEventListener('keyup', handleEnterKey);
    };
  }, [handleEnterKey]);
  
// Se descomentar isso a pesquisa vai ser ao mesmo tempo que voce escreve .  
/*
  useEffect(() => {
    const searchTimer = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => {
      clearTimeout(searchTimer);
    };
  }, [searchKeyword]);
*/
  return (
    <div className="movie-search">
      <Input
        type="text"
        placeholder="Enter keyword"
        value={searchKeyword}
        onChange={handleInputChange}
      />  
      <Button className="small" onClick={handleSearch}>Search</Button>
    </div>
  );
};

export default MovieGrid;
