import React from 'react'
//import { useDispatch } from 'react-redux';

const Categories = ({value, updateValue}) => {
    //const dispatchFilter = useDispatch();
    const categoriesArray = ['Всі','М\'ясні','Вегітаріанські','Гриль','Гострі','Закриті']
    
    return (
        <div className="categories">
            <ul>
                {categoriesArray.map((el,ind) => {
                    return <li key={ind} onClick={() => updateValue(ind)} className={ind === value ? 'active' : null}>{el}</li>
                })}
            </ul>
        </div>
    )
}
export default Categories;