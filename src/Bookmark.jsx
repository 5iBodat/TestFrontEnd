import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap'
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import './App.css';

const Bookmark = () => {
    const [bookmark, setBookmark] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [category, setCategory] = useState([]);



    const fetchCategory = async () => {
        const res = await fetch('/fee-assessment-categories', { headers: { "Content-Type": "application/json" } });
        const data = await res.json();
        setCategory(data);
        setIsLoading(false)
    }

    function getBookmark() {
        localStorage.getItem('bookmark')
            ? setBookmark(JSON.parse(localStorage.getItem('bookmark')))
            : setBookmark([]);
        setIsLoading(false);
    }

    const handleBookMark = (item) => {
        const curruntBookmark = bookmark;
        const index = curruntBookmark.findIndex(
            bookmark => bookmark.id === item.id);
        if (index === -1) {
            curruntBookmark.push(item);
            setBookmark(curruntBookmark);
            localStorage.setItem('bookmark', JSON.stringify(curruntBookmark));
            getBookmark();
        }
        else {
            curruntBookmark.splice(index, 1);
            setBookmark(curruntBookmark);
            localStorage.setItem('bookmark', JSON.stringify(curruntBookmark));
            getBookmark();
        }
    }

    useEffect(() => {
        getBookmark();
        fetchCategory()
    }, [])

    return (
        <>
            <div>
                <h1>Bookmark</h1>
                <Row>
                    {isLoading ? <h1>Loading...</h1> : (
                        bookmark.map(item => (
                            <Col md={3} sm={6} className="col-6 mb-3">
                                <div className="card" key={item.id}>
                                    <button className="btn btn-light bookmark" type="button" id="btn-bookmark" onClick={() => handleBookMark(item)}>
                                        {bookmark.find(bookmark => bookmark.id === item.id) ? <FaHeart color='red' /> : <FaRegHeart color='red' />}
                                    </button>
                                    <img className="card-img-top" src={item.cover_url} alt="Book Images" />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.title}</h5>
                                        <p>
                                            {category?.map(ct => {
                                                if (ct.id === item.category_id) {
                                                    return ct.name
                                                }
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </Col>
                        ))
                    )}

                </Row>
            </div>
        </>
    );
}

export default Bookmark;
