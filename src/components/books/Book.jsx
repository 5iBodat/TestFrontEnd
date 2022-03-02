import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'reactstrap'
import ReactPaginate from 'react-paginate';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { BsSearch } from 'react-icons/bs';
import { categoryContext } from '../../App';
import './book.css'


const Book = () => {
    const { id, name } = useParams();
    const [book, setBook] = useState([]);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [isSearch, setIsSearch] = useState(false);
    const [bookmark, setBookmark] = useState([]);
    const [icon, setIcon] = useState(<FaRegHeart />)
    const { ctContext } = useContext(categoryContext);
    let apiUrl = '/fee-assessment-books';
    const fetchBook = async (id, currentPage, perPage) => {
        const res = await fetch(apiUrl + `?categoryId=${id}&page=${currentPage}&size=${perPage}`, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        const data = await res.json();
        setBook(data);
        setIsLoading(false);
    }

    const fetchTotalBooks = async (id) => {
        const res = await fetch(apiUrl + `?categoryId=${id}`, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        const data = await res.json();
        setTotal(data);
    }

    function getBookmark() {
        localStorage.getItem('bookmark')
            ? setBookmark(JSON.parse(localStorage.getItem('bookmark')))
            : setBookmark([]);
    }


    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
        const newPage = data.selected;
        fetchBook(id, newPage, perPage);

    }

    const handleSearch = (e) => {
        if (e.target.value === '') {
            const filtered = book.filter(item => {
                return item.title?.toLowerCase().includes(e.target.value?.toLowerCase());
            })
            setBook(filtered);
            setIsSearch(false)
        }
        else {

            const filtered = total.filter(item => {
                return item.title?.toLowerCase().includes(e.target.value?.toLowerCase());
            })
            setBook(filtered);
            setIsSearch(true)
        }
    }


    const pageCount = Math.ceil(total.length / perPage);


    const handleBookMark = (item) => {
        const curruntBookmark = bookmark;
        const index = curruntBookmark.findIndex(
            bookmark => bookmark.id === item.id);
        if (index === -1) {
            curruntBookmark.push(item);
            setBookmark(curruntBookmark);
            localStorage.setItem('bookmark', JSON.stringify(curruntBookmark));
            setIcon(<FaHeart color='red' />)
        }
        else {
            curruntBookmark.splice(index, 1);
            setBookmark(curruntBookmark);
            localStorage.setItem('bookmark', JSON.stringify(curruntBookmark));
            setIcon(<FaRegHeart color='red' />)
        }
    }


    useEffect(() => {
        fetchBook(id, currentPage, perPage);
        fetchTotalBooks(id);
        getBookmark();
    }, [])


    return (
        <>
            <div className="title mb-3">{name}</div>

            <Row>
                <Col md={6}>
                    <div className="input-group mb-3">
                        <input
                            onChange={handleSearch}
                            type="text"
                            className="form-control search-input"
                            placeholder="Search title or authors...."
                            aria-label="search"
                            aria-describedby="btn-search" />
                        <BsSearch />
                    </div>
                </Col>
                <Col md={12}>
                    <Row>
                        {isLoading ? 'Loading...' : book.map(item => (
                            <Col md={3} sm={6} className="mb-3 col-6">
                                <div className="card" key={item.id}>
                                    <button className="btn btn-light bookmark" type="button" id="btn-bookmark" onClick={() => handleBookMark(item)}>
                                        {bookmark.find(bookmark => bookmark.id === item.id) ? <FaHeart color='red' /> : <FaRegHeart color='red' />}
                                    </button>
                                    <img className="card-img-top" src={item.cover_url} alt="Book Images" />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.title}</h5>
                                        <p className="card-text">
                                            {ctContext.map(ct => {
                                                if (ct.id === item.category_id) {
                                                    return ct.name
                                                }
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </Col>
                        ))}

                    </Row>

                </Col>
                <Col>
                    {isSearch ? (
                        '1,2.3'
                    ) : (
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel=">"
                            previousLabel="<"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={3}
                            pageCount={pageCount}
                            renderOnZeroPageCount={null}
                            containerClassName="pagination"
                            pageClassName='page-item'
                            pageLinkClassName='page-link'
                            activeClassName='active'
                            previousClassName='page-item'
                            nextClassName='page-item'
                            previousLinkClassName='page-link'
                            nextLinkClassName='page-link'
                            breakClassName='page-item'
                            breakLinkClassName='page-link'
                            className='pagination justify-content-center'
                        />
                    )}
                </Col>
            </Row>
        </>
    );
}

export default Book;
