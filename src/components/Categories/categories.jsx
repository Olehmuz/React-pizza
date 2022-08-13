import React from 'react'

const Categories = ({value, updateValue}) => {
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