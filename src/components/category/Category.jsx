import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import './category.css';
import { categoryContext } from '../../App';


const Category = () => {
    const [category, setCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { setCtContext } = useContext(categoryContext);
    const fetchCategory = async () => {
        const res = await fetch('/fee-assessment-categories', {
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
        setCategory(data);
        setCtContext(data);
        setIsLoading(false);
    }
    useEffect(() => {
        fetchCategory();
    }, [])

    return (
        <>
            <div>
                <h1>Category</h1>
                <Row>
                    <Col className='p-0'>
                        <ul className="category">
                            {isLoading ? 'Loading...' : category.map(item => (
                                <Link to={`/${item.id}/${item.name}`} className='link' >
                                    <li className="category-list" key={item.id}>
                                        {item.name}
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default Category;
